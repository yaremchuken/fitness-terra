package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.EquipmentType
import yaremchuken.fitnessterra.model.workout.ExerciseType
import yaremchuken.fitnessterra.model.workout.MuscleGroup

data class ExerciseDto(
    val title: String,
    val type: ExerciseType,
    val muscleGroups: Array<MuscleGroup>,
    val repeats: Int?,
    val duration: Int?,
    val calories: Int?,
    val equipments: Array<EquipmentType>,
    val weights: Array<Int>
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ExerciseDto

        if (title != other.title) return false
        if (type != other.type) return false
        if (!muscleGroups.contentEquals(other.muscleGroups)) return false
        if (repeats != other.repeats) return false
        if (duration != other.duration) return false
        if (calories != other.calories) return false
        if (!equipments.contentEquals(other.equipments)) return false
        if (!weights.contentEquals(other.weights)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = title.hashCode()
        result = 31 * result + type.hashCode()
        result = 31 * result + muscleGroups.contentHashCode()
        result = 31 * result + (repeats ?: 0)
        result = 31 * result + (duration ?: 0)
        result = 31 * result + (calories ?: 0)
        result = 31 * result + equipments.contentHashCode()
        result = 31 * result + weights.contentHashCode()
        return result
    }
}

