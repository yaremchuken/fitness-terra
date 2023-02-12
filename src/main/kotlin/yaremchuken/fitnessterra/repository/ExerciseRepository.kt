package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.workout.Exercise

interface ExerciseRepository: JpaRepository<Exercise, Long>
