package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.api.dto.WorkoutDto
import yaremchuken.fitnessterra.api.dto.WorkoutPreviewDto
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.Workout
import yaremchuken.fitnessterra.repository.WorkoutRepository

@Service
class WorkoutService(
    private val workoutRepository: WorkoutRepository,
    private val exerciseService: ExerciseService
) {
    fun save(workout: Workout) = workoutRepository.save(workout)

    fun getAll(user: User) = workoutRepository.findAllByUser(user)

    fun get(id: Long) = workoutRepository.findById(id)

    fun toDto(workout: Workout, exercises: Array<ExerciseDto>) =
        WorkoutDto(
            workout.id!!,
            workout.title,
            exercises,
            workout.rests)

    fun toPreviewDto(workout: Workout) =
        WorkoutPreviewDto(
            workout.id!!,
            workout.title,
            workout.exercises.map { exerciseService.toIndexedPreviewDto(it, true) }.toTypedArray(),
            workout.rests)
}
