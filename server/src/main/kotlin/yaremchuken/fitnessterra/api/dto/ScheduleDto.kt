package yaremchuken.fitnessterra.api.dto

import java.time.LocalDate

class ScheduleDto(
    val id: Long?,
    val scheduledAt: LocalDate,
    val workouts: Array<WorkoutDto>
)
