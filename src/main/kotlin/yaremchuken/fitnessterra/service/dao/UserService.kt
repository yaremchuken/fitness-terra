package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.repository.UserRepository
import java.time.Instant

@Service
class UserService (private val repository: UserRepository) {

    fun create(username: String, password: String, refreshToken: String, issuedAt: Instant): User =
        repository.save(User(username, password, refreshToken, issuedAt))

    fun getById(id: Long): User? = repository.findById(id).orElse(null)

    fun getByUsername(username: String): User? = repository.findByUsername(username)

    fun update(user: User): User = repository.saveAndFlush(user)
}
