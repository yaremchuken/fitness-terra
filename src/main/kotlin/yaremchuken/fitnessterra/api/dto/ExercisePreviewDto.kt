package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.ActivityType
import yaremchuken.fitnessterra.model.workout.Equipment
import yaremchuken.fitnessterra.model.workout.Exercise
import yaremchuken.fitnessterra.model.workout.ExerciseTemplate
import yaremchuken.fitnessterra.model.workout.MuscleGroup

open class ExercisePreviewDto(
    val id: Long?,
    val templateId: Long,
    val title: String,
    val type: ActivityType,
    val muscleGroups: Array<MuscleGroup>,
    val description: String?,
    val index: Int?,
    val repeats: Int,
    val duration: Int,
    val calories: Int,
    val equipment: Array<Equipment>,
    var preview: ByteArray?
)
