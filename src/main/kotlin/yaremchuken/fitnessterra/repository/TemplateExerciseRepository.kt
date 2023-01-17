package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.TemplateExercise

interface TemplateExerciseRepository: JpaRepository<TemplateExercise, Long> {
    fun findAllByUser(user: User): List<TemplateExercise>
}
