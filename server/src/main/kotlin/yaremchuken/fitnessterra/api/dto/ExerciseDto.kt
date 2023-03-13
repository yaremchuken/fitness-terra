package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.ActivityType
import yaremchuken.fitnessterra.model.workout.Equipment
import yaremchuken.fitnessterra.model.workout.MuscleGroup

class ExerciseDto(
    id: Long?,
    templateId: Long,
    title: String,
    type: ActivityType,
    muscleGroups: Array<MuscleGroup>,
    description: String?,
    index: Int?,
    repeats: Int,
    duration: Int,
    calories: Int,
    equipment: Array<Equipment>,
    preview: ByteArray?,
    var media: ByteArray?
): ExercisePreviewDto(
    id,
    templateId,
    title,
    type,
    muscleGroups,
    description,
    index,
    repeats,
    duration,
    calories,
    equipment,
    preview
)
