package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.ActivityType
import yaremchuken.fitnessterra.model.workout.ExerciseTemplate
import yaremchuken.fitnessterra.model.workout.MuscleGroup

open class ExercisePreviewDto(
    val id: Long?,
    val title: String,
    val type: ActivityType,
    val muscleGroups: Array<MuscleGroup>,
    var preview: ByteArray?
) {
    companion object {
        fun toDto(exercise: ExerciseTemplate, preview: ByteArray?) =
            ExercisePreviewDto(exercise.id!!, exercise.title, exercise.type, exercise.muscleGroups, preview)
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ExercisePreviewDto

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}
