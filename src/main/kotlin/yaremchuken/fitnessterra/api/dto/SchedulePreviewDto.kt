package yaremchuken.fitnessterra.api.dto

import java.time.LocalDate

class SchedulePreviewDto(
    val id: Long?,
    val scheduledAt: LocalDate,
    val previews: Array<WorkoutPreviewDto>
)
