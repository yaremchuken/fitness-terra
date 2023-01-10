package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.Exercise

interface ExerciseRepository: JpaRepository<Exercise, Long> {
    fun findAllByUser(user: User): List<Exercise>
}
