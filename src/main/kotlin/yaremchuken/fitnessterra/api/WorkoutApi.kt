package yaremchuken.fitnessterra.api

import org.apache.commons.lang3.StringUtils
import org.springframework.lang.NonNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.api.dto.WorkoutDto
import yaremchuken.fitnessterra.api.dto.WorkoutPreviewDto
import yaremchuken.fitnessterra.api.error.EntityNotExistsException
import yaremchuken.fitnessterra.model.workout.Exercise
import yaremchuken.fitnessterra.model.workout.Workout
import yaremchuken.fitnessterra.service.AmazonS3Service
import yaremchuken.fitnessterra.service.dao.ExerciseService
import yaremchuken.fitnessterra.service.dao.ExerciseTemplateService
import yaremchuken.fitnessterra.service.dao.UserService
import yaremchuken.fitnessterra.service.dao.WorkoutService

@RestController
@RequestMapping("api/workout")
class WorkoutApi(
    userService: UserService,
    private val workoutService: WorkoutService,
    private val exerciseTemplateService: ExerciseTemplateService,
    private val exerciseService: ExerciseService
): BaseApi(userService) {

    @GetMapping("previews")
    @ResponseBody
    fun getPreviews(): List<WorkoutPreviewDto> {
        val user = getUser()
        val previews = workoutService.getAll(user)
        return previews.map { workoutService.toPreviewDto(it) }
    }

    @GetMapping("{id}")
    @ResponseBody
    fun get(@PathVariable @NonNull id: Long): WorkoutDto {
        val user = getUser()
        val workout = workoutService.get(id).orElseThrow { EntityNotExistsException() }

        if (user.id != workout.user.id) throw EntityNotExistsException()

        val exercises: List<ExerciseDto> = workout.exercises.map { exerciseService.toDto(it, true, true)}

        return workoutService.toDto(workout, exercises.toTypedArray())
    }

    @PostMapping
    fun save(@RequestBody @NonNull dto: WorkoutPreviewDto): WorkoutDto {
        val user = getUser()
        val exercises: MutableList<Exercise> = ArrayList()
        val templates = exerciseTemplateService.get(user, dto.previews.map { it -> it.templateId })

        for (i in 0..dto.previews.size) {
            val preview = dto.previews[i]
            val template = templates.find { it -> it.id == preview.templateId }!!
            exercises.add(Exercise(template, i, preview.equipment, preview.repeats, preview.duration, preview.calories))
        }

        val persistedExercises = exerciseService.save(exercises)

        return workoutService.toDto(
            workoutService.save(Workout(user, dto.title, persistedExercises, dto.rests)),
            persistedExercises.map { exerciseService.toDto(it) }.toTypedArray())
    }
}
