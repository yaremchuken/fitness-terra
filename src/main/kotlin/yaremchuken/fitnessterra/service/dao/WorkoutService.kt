package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.repository.WorkoutRepository

@Service
class WorkoutService(private val workoutRepository: WorkoutRepository) {
}
