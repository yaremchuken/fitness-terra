package yaremchuken.fitnessterra.api.dto

class WorkoutPreviewDto(
    val id: Long?,
    val title: String,
    val previews: Array<IndexedExercisePreviewDto>,
    val rests: Array<Int>
)
