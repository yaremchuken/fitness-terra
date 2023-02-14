package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.api.dto.ExercisePreviewDto
import yaremchuken.fitnessterra.api.dto.IndexedExercisePreviewDto
import yaremchuken.fitnessterra.model.workout.Exercise
import yaremchuken.fitnessterra.repository.ExerciseRepository
import yaremchuken.fitnessterra.service.AmazonS3Service

@Service
class ExerciseService(
    private val exerciseRepository: ExerciseRepository,
    private val amazonS3Service: AmazonS3Service
) {
    fun save(exercises:  List<Exercise>) = exerciseRepository.saveAll(exercises)

    fun getMany(ids: Collection<Long>) = exerciseRepository.findAllById(ids)

    fun toDto(exercise: Exercise, attachPreview: Boolean = false, attachMedia: Boolean = false) =
        ExerciseDto(
            exercise.id!!,
            exercise.template.id!!,
            exercise.template.title,
            exercise.template.type,
            exercise.template.muscleGroups,
            exercise.repeats,
            exercise.duration,
            exercise.calories,
            exercise.equipment,
            if (attachPreview && exercise.template.previewUrl != null)
                amazonS3Service.download(exercise.template.previewUrl) else null,
            exercise.index,
            if (attachMedia && exercise.template.mediaUrl != null)
                amazonS3Service.download(exercise.template.mediaUrl) else null)

    fun toPreviewDto(exercise: Exercise, attachPreview: Boolean = false) =
        ExercisePreviewDto(
            exercise.id!!,
            exercise.template.id!!,
            exercise.template.title,
            exercise.template.type,
            exercise.template.muscleGroups,
            exercise.repeats,
            exercise.duration,
            exercise.calories,
            exercise.equipment,
            if (attachPreview && exercise.template.previewUrl != null)
                amazonS3Service.download(exercise.template.previewUrl) else null)

    fun toIndexedPreviewDto(exercise: Exercise, attachPreview: Boolean = false) =
        IndexedExercisePreviewDto(
            exercise.index,
            exercise.id!!,
            exercise.template.id!!,
            exercise.template.title,
            exercise.template.type,
            exercise.template.muscleGroups,
            exercise.repeats,
            exercise.duration,
            exercise.calories,
            exercise.equipment,
            if (attachPreview && exercise.template.previewUrl != null)
                amazonS3Service.download(exercise.template.previewUrl) else null)
}
