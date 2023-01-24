package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.Workout

class WorkoutPreviewDto(
    id: Long?,
    title: String,
    previews: List<Long>
) {
    companion object {
        fun toDto(workout: Workout) =
            WorkoutPreviewDto(
                workout.id!!,
                workout.title,
                workout.exercises.map { it -> it.id!! } )
    }
}
