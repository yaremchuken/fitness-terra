package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.workout.Workout

interface WorkoutRepository: JpaRepository<Workout, Long>
