package yaremchuken.fitnessterra.service

import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.api.error.UserNotExistsException
import yaremchuken.fitnessterra.repository.UserRepository

@Service
class UserDetailsService(private val userRepository: UserRepository) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username) ?: throw UserNotExistsException()
        val roles = user.roles.stream().map { it.id.role }.toList()
        return User(user.username, user.password, roles)
    }
}
