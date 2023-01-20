package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.ActivityType
import yaremchuken.fitnessterra.model.workout.MuscleGroup
import yaremchuken.fitnessterra.model.workout.TemplateExercise

data class PreviewExerciseDto(
    val id: Long,
    val title: String,
    val type: ActivityType,
    val muscleGroups: Array<MuscleGroup>
) {
    companion object {
        fun toDto(exercise: TemplateExercise) =
            PreviewExerciseDto(exercise.id!!, exercise.title, exercise.type, exercise.muscleGroups)
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as PreviewExerciseDto

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id?.hashCode() ?: 0
    }
}
