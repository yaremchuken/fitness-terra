package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.api.dto.WorkoutDto
import yaremchuken.fitnessterra.api.dto.WorkoutPreviewDto
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.WorkoutTemplate
import yaremchuken.fitnessterra.repository.WorkoutTemplateRepository

@Service
class WorkoutTemplateService(
    private val workoutTemplateRepository: WorkoutTemplateRepository,
    private val exerciseService: ExerciseService
) {
    fun save(workoutTemplate: WorkoutTemplate) = workoutTemplateRepository.save(workoutTemplate)

    fun getAll(user: User) = workoutTemplateRepository.findAllByUser(user)

    fun get(id: Long) = workoutTemplateRepository.findById(id)

    fun toDto(workoutTemplate: WorkoutTemplate, exercises: Array<ExerciseDto>) =
        WorkoutDto(
            workoutTemplate.id!!,
            workoutTemplate.title,
            exercises,
            workoutTemplate.rests)

    fun toPreviewDto(workoutTemplate: WorkoutTemplate) =
        WorkoutPreviewDto(
            workoutTemplate.id!!,
            workoutTemplate.title,
            workoutTemplate.exercises.map { exerciseService.toIndexedPreviewDto(it, true) }.toTypedArray(),
            workoutTemplate.rests)
}
