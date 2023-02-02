package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.ActivityType
import yaremchuken.fitnessterra.model.workout.Equipment
import yaremchuken.fitnessterra.model.workout.MuscleGroup

class ExerciseDto(
    id: Long?,
    title: String,
    type: ActivityType,
    muscleGroups: Array<MuscleGroup>,
    preview: ByteArray?,
    repeats: Int,
    duration: Int,
    calories: Int,
    equipment: Array<Equipment>,
    var media: ByteArray?
): ExercisePreviewDto(id, title, type, muscleGroups, repeats, duration, calories, equipment, preview) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ExerciseDto

        if (id != other.id) return false
        if (title != other.title) return false
        if (type != other.type) return false
        if (!muscleGroups.contentEquals(other.muscleGroups)) return false
        if (repeats != other.repeats) return false
        if (duration != other.duration) return false
        if (calories != other.calories) return false
        if (!equipment.contentEquals(other.equipment)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id?.hashCode() ?: 0
        result = 31 * result + title.hashCode()
        result = 31 * result + type.hashCode()
        result = 31 * result + muscleGroups.contentHashCode()
        result = 31 * result + repeats
        result = 31 * result + duration
        result = 31 * result + calories
        result = 31 * result + equipment.contentHashCode()
        return result
    }
}
