package yaremchuken.fitnessterra.api

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import yaremchuken.fitnessterra.service.UserService

@RestController
@RequestMapping("api/user")
class UserApi(private val userService: UserService)

data class UserDTO(val uid: Long)
