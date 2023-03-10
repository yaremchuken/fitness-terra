package yaremchuken.fitnessterra.api

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus
import yaremchuken.fitnessterra.api.error.EntityNotExistsException
import yaremchuken.fitnessterra.api.error.InvalidCredentialsException
import yaremchuken.fitnessterra.api.error.UserAlreadyExistsException
import yaremchuken.fitnessterra.api.error.UserNotExistsException
import yaremchuken.fitnessterra.security.JwtAuthenticationException

@ControllerAdvice
class ApiAdvice {
    @ExceptionHandler(InvalidCredentialsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleInvalidCredentials(ex: InvalidCredentialsException) = ex.message

    @ExceptionHandler(JwtAuthenticationException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleJwtException(ex: JwtAuthenticationException) = ex.message

    @ExceptionHandler(UserNotExistsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleUserNotExists(ex: UserNotExistsException) = ex.message

    @ExceptionHandler(EntityNotExistsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleEntityNotExists(ex: EntityNotExistsException) = ex.message

    @ExceptionHandler(UserAlreadyExistsException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    fun handleUserAlreadyExists(ex: UserAlreadyExistsException) = ex.message
}
