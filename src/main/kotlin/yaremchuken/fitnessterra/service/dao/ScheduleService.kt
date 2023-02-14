package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.ScheduleDto
import yaremchuken.fitnessterra.api.dto.SchedulePreviewDto
import yaremchuken.fitnessterra.model.Schedule
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.repository.ScheduleRepository
import java.time.LocalDate

@Service
class ScheduleService(
    private val workoutService: WorkoutService,
    private val scheduleRepository: ScheduleRepository
) {
    fun save(schedule: Schedule) = scheduleRepository.save(schedule)

    fun get(id: Long) = scheduleRepository.findById(id)

    fun getInRange(user: User, begin: LocalDate, end: LocalDate) =
        scheduleRepository.getByUserAndScheduledAtBetween(user, begin, end)

    fun toDto(schedule: Schedule) =
        ScheduleDto(
            schedule.id,
            schedule.scheduledAt,
            schedule.completed,
            schedule.workouts.map { workoutService.toDto(it) }.toTypedArray())

    fun toPreviewDto(schedule: Schedule) =
        SchedulePreviewDto(
            schedule.id,
            schedule.scheduledAt,
            schedule.completed,
            schedule.workouts.map { workoutService.toPreviewDto(it) }.toTypedArray())
}
