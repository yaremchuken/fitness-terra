package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.repository.WorkoutRepository

@Service
class WorkoutService(private val workoutRepository: WorkoutRepository) {

    fun getAll(user: User) = workoutRepository.findAllByUser(user)
}
