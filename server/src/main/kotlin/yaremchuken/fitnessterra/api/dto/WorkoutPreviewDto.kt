package yaremchuken.fitnessterra.api.dto

class WorkoutPreviewDto(
    val id: Long?,
    val index: Int?,
    val templateId: Long?,
    val title: String,
    val previews: Array<ExercisePreviewDto>,
    val rests: Array<Int>,
    val completed: Boolean,
)
