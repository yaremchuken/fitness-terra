package yaremchuken.fitnessterra.api.dto

class WorkoutDto(
    val id: Long?,
    val index: Int?,
    val templateId: Long,
    val title: String,
    val exercises: Array<ExerciseDto>,
    val rests: Array<Int>,
    val completed: Boolean
)
