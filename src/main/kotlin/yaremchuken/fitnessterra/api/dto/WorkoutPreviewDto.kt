package yaremchuken.fitnessterra.api.dto

class WorkoutPreviewDto(
    val id: Long?,
    val index: Int?,
    val templateId: Long?,
    val title: String,
    val previews: Array<IndexedExercisePreviewDto>,
    val rests: Array<Int>
)
