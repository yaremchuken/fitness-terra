package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.workout.ExerciseTemplate
import yaremchuken.fitnessterra.model.workout.Workout

interface WorkoutRepository: JpaRepository<Workout, Long> {
    fun findAllByUser(user: User): List<Workout>
}
