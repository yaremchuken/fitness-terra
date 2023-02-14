package yaremchuken.fitnessterra.api

import org.springframework.lang.NonNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import yaremchuken.fitnessterra.api.dto.ScheduleDto
import yaremchuken.fitnessterra.api.dto.SchedulePreviewDto
import yaremchuken.fitnessterra.api.error.EntityNotExistsException
import yaremchuken.fitnessterra.model.Schedule
import yaremchuken.fitnessterra.model.workout.Workout
import yaremchuken.fitnessterra.service.dao.ExerciseService
import yaremchuken.fitnessterra.service.dao.ScheduleService
import yaremchuken.fitnessterra.service.dao.UserService
import yaremchuken.fitnessterra.service.dao.WorkoutService
import yaremchuken.fitnessterra.service.dao.WorkoutTemplateService
import java.time.LocalDate

@RestController
@RequestMapping("api/schedule")
class ScheduleApi(
    userService: UserService,
    private val scheduleService: ScheduleService,
    private val workoutService: WorkoutService,
    private val exerciseService: ExerciseService,
    private val workoutTemplateService: WorkoutTemplateService
): BaseApi(userService) {

    @GetMapping("previews")
    @ResponseBody
    fun getPreviews(
        @RequestParam @NonNull begin: LocalDate,
        @RequestParam @NonNull end: LocalDate
    ): List<SchedulePreviewDto> {
        val user = getUser()
        val previews = scheduleService.getInRange(user, begin, end)
        return previews.map { scheduleService.toPreviewDto(it) }
    }

    @GetMapping("{id}")
    @ResponseBody
    fun get(@PathVariable @NonNull id: Long): ScheduleDto {
        val user = getUser()
        val schedule = scheduleService.get(id).orElseThrow { EntityNotExistsException() }

        if (user.id != schedule.user.id) throw EntityNotExistsException()

        return scheduleService.toDto(schedule)
    }

    @PostMapping
    fun save(@RequestBody @NonNull dto: SchedulePreviewDto): SchedulePreviewDto {
        val user = getUser()

        if (dto.id != null) {
            val cleared = scheduleService.get(dto.id).orElseThrow { EntityNotExistsException() }
            cleared.workouts.removeAll(cleared.workouts)
            scheduleService.save(cleared)
        }

        var workouts: MutableList<Workout> = ArrayList()
        val templates = workoutTemplateService.get(user, dto.previews.map { it.templateId!! })

        for (i in 0 until dto.previews.size) {
            val preview = dto.previews[i]
            val template = templates.find { it.id == preview.templateId }!!

            val exercises = exerciseService.getMany(preview.previews.map { it.id!! })

            val workout = Workout(template, i, exercises)
            workouts.add(workout)
        }

        workouts = workoutService.save(workouts)
        val entity = Schedule(user, dto.scheduledAt, dto.completed, workouts)
        entity.id = dto.id
        val schedule = scheduleService.save(entity)

        return scheduleService.toPreviewDto(schedule)
    }
}
