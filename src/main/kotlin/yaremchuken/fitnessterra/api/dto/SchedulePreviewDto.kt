package yaremchuken.fitnessterra.api.dto

import java.time.LocalDate

class SchedulePreviewDto(
    val id: Long?,
    val scheduledAt: LocalDate,
    val completed: Boolean,
    val previews: Array<WorkoutPreviewDto>
)
