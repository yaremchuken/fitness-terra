package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import yaremchuken.fitnessterra.model.workout.Exercise

interface ExerciseRepository: JpaRepository<Exercise, Long> {

    @Query(value = "delete from public.workout_exercises where workout_id = ?1 returning 1", nativeQuery = true)
    fun deleteLinks(workoutId: Long)
}
