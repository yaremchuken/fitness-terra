package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.Workout

class WorkoutDto(
    val id: Long?,
    val title: String,
    val exercises: Array<ExerciseDto>,
    val rests: Array<Int>
)
