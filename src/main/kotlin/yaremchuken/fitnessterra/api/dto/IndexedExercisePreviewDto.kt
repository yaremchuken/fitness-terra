package yaremchuken.fitnessterra.api.dto

import yaremchuken.fitnessterra.model.workout.ActivityType
import yaremchuken.fitnessterra.model.workout.Equipment
import yaremchuken.fitnessterra.model.workout.MuscleGroup

class IndexedExercisePreviewDto(
    val index: Int,
    id: Long?,
    templateId: Long,
    title: String,
    type: ActivityType,
    muscleGroups: Array<MuscleGroup>,
    repeats: Int,
    duration: Int,
    calories: Int,
    equipment: Array<Equipment>,
    preview: ByteArray?
): ExercisePreviewDto(id, templateId, title, type, muscleGroups, repeats, duration, calories, equipment, preview)
