package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
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

    fun get(user: User, ids: Collection<Long>) = workoutTemplateRepository.findByUserAndIdIsIn(user, ids)

    fun toDto(template: WorkoutTemplate) =
        WorkoutDto(
            null,
            null,
            template.id!!,
            template.title,
            template.exercises.map { exerciseService.toDto(it, true, true)}.toTypedArray(),
            template.rests)

    fun toPreviewDto(template: WorkoutTemplate) =
        WorkoutPreviewDto(
            null,
            null,
            template.id!!,
            template.title,
            template.exercises.map { exerciseService.toIndexedPreviewDto(it, true) }.toTypedArray(),
            template.rests)
}
