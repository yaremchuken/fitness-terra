package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.ExerciseTemplate
import yaremchuken.fitnessterra.repository.ExerciseTemplateRepository

@Service
class ExerciseTemplateService(private val exerciseRepository: ExerciseTemplateRepository) {

    fun save(exercise: ExerciseTemplate) = exerciseRepository.save(exercise)

    fun save(user: User, dto: ExerciseDto) = exerciseRepository.save(fromDto(user, dto))

    fun getAll(user: User) = exerciseRepository.findAllByUser(user)

    fun get(id: Long) = exerciseRepository.findById(id)

    fun get(user: User, ids: Collection<Long>) = exerciseRepository.findByUserAndIdIsIn(user, ids)

    fun toDto(entity: ExerciseTemplate) =
        ExerciseDto(
            entity.id,
            entity.title,
            entity.type,
            entity.muscleGroups,
            null,
            entity.repeats,
            entity.duration,
            entity.calories,
            entity.equipment,
            null)

    fun fromDto(user: User, dto: ExerciseDto): ExerciseTemplate {
        val exercise =
            ExerciseTemplate(
                user,
                dto.title,
                dto.type,
                dto.muscleGroups,
                null,
                null,
                dto.equipment,
                dto.repeats,
                dto.duration,
                dto.calories)
        exercise.id = dto.id
        return exercise
    }
}
