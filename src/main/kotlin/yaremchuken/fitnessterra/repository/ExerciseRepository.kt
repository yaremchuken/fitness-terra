package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.workout.Exercise
import yaremchuken.fitnessterra.model.workout.ExerciseTemplate

interface ExerciseRepository: JpaRepository<Exercise, Long> {
}
