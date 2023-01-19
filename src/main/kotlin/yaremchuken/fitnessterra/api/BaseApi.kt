package yaremchuken.fitnessterra.api

import org.springframework.security.core.context.SecurityContextHolder
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.service.dao.UserService

abstract class BaseApi(private val userService: UserService) {
    protected fun getUser(): User? {
        val user = SecurityContextHolder.getContext().authentication.principal as org.springframework.security.core.userdetails.User
        return userService.getByUsername(user.username)
    }
}
