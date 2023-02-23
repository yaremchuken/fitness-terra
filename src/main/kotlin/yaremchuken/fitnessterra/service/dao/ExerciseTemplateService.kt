package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.api.dto.ExercisePreviewDto
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.ExerciseTemplate
import yaremchuken.fitnessterra.repository.ExerciseTemplateRepository
import yaremchuken.fitnessterra.service.AmazonS3Service

@Service
class ExerciseTemplateService(
    private val exerciseRepository: ExerciseTemplateRepository,
    private val amazonS3Service: AmazonS3Service
) {

    fun save(exercise: ExerciseTemplate) = exerciseRepository.save(exercise)

    fun save(user: User, dto: ExerciseDto) = exerciseRepository.save(fromDto(user, dto))

    fun getAll(user: User) = exerciseRepository.findAllByUser(user)

    fun get(id: Long) = exerciseRepository.findById(id)

    fun get(user: User, ids: Collection<Long>) = exerciseRepository.findByUserAndIdIsIn(user, ids)

    fun toExerciseDto(template: ExerciseTemplate, attachPreview: Boolean = false, attachMedia: Boolean = false) =
        ExerciseDto(
            null,
            template.id!!,
            template.title,
            template.type,
            template.muscleGroups,
            template.description,
            null,
            template.repeats,
            template.duration,
            template.calories,
            template.equipment,
            if (attachPreview && template.previewUrl !== null)
                amazonS3Service.download(template.previewUrl) else null,
            if (attachMedia && template.mediaUrl !== null)
                amazonS3Service.download(template.mediaUrl!!) else null)

    fun toPreviewDto(template: ExerciseTemplate, attachPreview: Boolean = false, preview: ByteArray? = null) =
        ExercisePreviewDto(
            null,
            template.id!!,
            template.title,
            template.type,
            template.muscleGroups,
            template.description,
            null,
            template.repeats,
            template.duration,
            template.calories,
            template.equipment,
            if (attachPreview && template.previewUrl != null)
                amazonS3Service.download(template.previewUrl) else preview
        )

    fun fromDto(user: User, dto: ExerciseDto): ExerciseTemplate {
        val template =
            ExerciseTemplate(
                user,
                dto.title,
                dto.type,
                dto.muscleGroups,
                dto.description,
                null,
                null,
                dto.equipment,
                dto.repeats,
                dto.duration,
                dto.calories)
        template.id = dto.templateId
        return template
    }
}
