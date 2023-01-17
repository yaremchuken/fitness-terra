package yaremchuken.fitnessterra.service

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.TemplateExerciseDto
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.TemplateExercise
import yaremchuken.fitnessterra.repository.TemplateExerciseRepository

@Service
class TemplateExerciseService(private val exerciseRepository: TemplateExerciseRepository) {
    fun save(user: User, dto: TemplateExerciseDto) = exerciseRepository.save(fromDto(user, dto))

    fun getAll(user: User) = exerciseRepository.findAllByUser(user)

    fun toDto(entity: TemplateExercise) =
        TemplateExerciseDto(
            entity.id,
            entity.title,
            entity.type,
            entity.muscleGroups,
            entity.repeats,
            entity.duration,
            entity.calories,
            entity.equipment)

    fun fromDto(user: User, dto: TemplateExerciseDto): TemplateExercise {
        val exercise = TemplateExercise(user, dto.title, dto.type, dto.muscleGroups, dto.repeats,
                                dto.duration, dto.calories, dto.equipment)
        exercise.id = dto.id
        return exercise
    }
}