package yaremchuken.fitnessterra.api.dto

class WorkoutDto(
    val id: Long?,
    val title: String,
    val exercises: Array<ExerciseDto>,
    val rests: Array<Int>
)
