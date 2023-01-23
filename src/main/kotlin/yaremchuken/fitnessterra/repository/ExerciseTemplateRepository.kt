package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.ExerciseTemplate

interface ExerciseTemplateRepository: JpaRepository<ExerciseTemplate, Long> {
    fun findAllByUser(user: User): List<ExerciseTemplate>
}
