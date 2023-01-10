package yaremchuken.fitnessterra.service

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.Exercise
import yaremchuken.fitnessterra.repository.ExerciseRepository

@Service
class ExerciseService(private val exerciseRepository: ExerciseRepository) {
    fun create(user: User, dto: ExerciseDto) = exerciseRepository.save(fromDto(user, dto))

    fun getAll(user: User) = exerciseRepository.findAllByUser(user)

    fun toDto(entity: Exercise) =
        ExerciseDto(
            entity.title,
            entity.type,
            entity.muscleGroups,
            entity.repeats,
            entity.duration,
            entity.calories,
            entity.equipments,
            entity.weights)

    fun fromDto(user: User, dto: ExerciseDto) =
        Exercise(user, dto.title, dto.type, dto.muscleGroups, dto.repeats,
            dto.duration, dto.calories, dto.equipments, dto.weights)
}
