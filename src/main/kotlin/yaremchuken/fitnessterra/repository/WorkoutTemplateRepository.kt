package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.WorkoutTemplate

interface WorkoutTemplateRepository: JpaRepository<WorkoutTemplate, Long> {
    fun findAllByUser(user: User): List<WorkoutTemplate>
}
