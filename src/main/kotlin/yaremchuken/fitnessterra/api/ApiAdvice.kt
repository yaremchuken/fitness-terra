package yaremchuken.fitnessterra.api

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import yaremchuken.fitnessterra.api.error.InvalidCredentialsException
import yaremchuken.fitnessterra.api.error.UserAlreadyExistsException
import yaremchuken.fitnessterra.api.error.UserNotExistsException

@ControllerAdvice
class ApiAdvice {
    @ExceptionHandler(InvalidCredentialsException::class)
    @ResponseBody
    fun handleInvalidCredentials(ex: InvalidCredentialsException) =
        ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message)

    @ExceptionHandler(UserNotExistsException::class)
    @ResponseBody
    fun handleUserNotExists(ex: UserNotExistsException) =
        ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message)

    @ExceptionHandler(UserAlreadyExistsException::class)
    @ResponseBody
    fun handleUserAlreadyExists(ex: UserAlreadyExistsException) =
        ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message)
}
