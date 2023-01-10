package yaremchuken.fitnessterra.service

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.repository.WorkoutRepository

@Service
class WorkoutService(private val workoutRepository: WorkoutRepository) {
}
