package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.Workout

class WorkoutPreviewDto(
    val id: Long?,
    val title: String,
    val previews: Array<ExercisePreviewDto>,
    val rests: Array<Int>
)
