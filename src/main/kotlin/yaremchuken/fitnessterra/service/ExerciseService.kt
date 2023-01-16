package yaremchuken.fitnessterra.service

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.Exercise
import yaremchuken.fitnessterra.repository.ExerciseRepository

@Service
class ExerciseService(private val exerciseRepository: ExerciseRepository) {
    fun save(user: User, dto: ExerciseDto) = exerciseRepository.save(fromDto(user, dto))

    fun getAll(user: User) = exerciseRepository.findAllByUser(user)

    fun toDto(entity: Exercise) =
        ExerciseDto(
            entity.id,
            entity.title,
            entity.type,
            entity.muscleGroups,
            entity.repeats,
            entity.duration,
            entity.calories,
            entity.equipment)

    fun fromDto(user: User, dto: ExerciseDto): Exercise {
        val exercise = Exercise(user, dto.title, dto.type, dto.muscleGroups, dto.repeats,
                                dto.duration, dto.calories, dto.equipment)
        exercise.id = dto.id
        return exercise
    }
}
