package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
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
    fun save(workouts: List<Workout>) = workoutRepository.saveAll(workouts)

    fun get(id: Long) = workoutRepository.findById(id)

    fun toDto(workout: Workout) =
        WorkoutDto(
            workout.id!!,
            workout.index,
            workout.template.id!!,
            workout.template.title,
            workout.exercises.map { exerciseService.toDto(it, true, true)}.toTypedArray(),
            workout.template.rests,
            workout.completed)

    fun toPreviewDto(workout: Workout) =
        WorkoutPreviewDto(
            workout.id!!,
            workout.index,
            workout.template.id!!,
            workout.template.title,
            workout.exercises.map { exerciseService.toPreviewDto(it, true) }.toTypedArray(),
            workout.template.rests,
            workout.completed)
}
