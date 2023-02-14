package yaremchuken.fitnessterra.api

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
import yaremchuken.fitnessterra.model.workout.WorkoutTemplate
import yaremchuken.fitnessterra.service.dao.ExerciseService
import yaremchuken.fitnessterra.service.dao.ExerciseTemplateService
import yaremchuken.fitnessterra.service.dao.UserService
import yaremchuken.fitnessterra.service.dao.WorkoutTemplateService

@RestController
@RequestMapping("api/workout")
class WorkoutApi(
    userService: UserService,
    private val workoutTemplateService: WorkoutTemplateService,
    private val exerciseTemplateService: ExerciseTemplateService,
    private val exerciseService: ExerciseService
): BaseApi(userService) {

    @GetMapping("previews")
    @ResponseBody
    fun getPreviews(): List<WorkoutPreviewDto> {
        val user = getUser()
        val previews = workoutTemplateService.getAll(user)
        return previews.map { workoutTemplateService.toPreviewDto(it) }
    }

    @GetMapping("template/{id}")
    @ResponseBody
    fun getTemplate(@PathVariable @NonNull id: Long): WorkoutDto {
        val user = getUser()
        val workout = workoutTemplateService.get(id).orElseThrow { EntityNotExistsException() }
        if (user.id != workout.user.id) throw EntityNotExistsException()

        return workoutTemplateService.toDto(workout)
    }

    @PostMapping("template")
    fun saveTemplate(@RequestBody @NonNull dto: WorkoutPreviewDto): WorkoutPreviewDto {
        val user = getUser()

        if (dto.templateId != null) {
            val cleared = workoutTemplateService.get(dto.templateId).orElseThrow { EntityNotExistsException() }
            cleared.exercises.removeAll(cleared.exercises)
            workoutTemplateService.save(cleared)
        }

        var exercises: MutableList<Exercise> = ArrayList()
        val templates = exerciseTemplateService.get(user, dto.previews.map { it.templateId })

        for (i in 0 until dto.previews.size) {
            val preview = dto.previews[i]
            val template = templates.find { it.id == preview.templateId }!!
            exercises.add(Exercise(template, i, preview.equipment, preview.repeats, preview.duration, preview.calories))
        }

        exercises = exerciseService.save(exercises)
        val entity = WorkoutTemplate(user, dto.title, exercises, dto.rests)
        entity.id = dto.templateId
        val template = workoutTemplateService.save(entity)

        return workoutTemplateService.toPreviewDto(template)
    }
}
