package yaremchuken.fitnessterra.api

import org.springframework.lang.NonNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.api.error.UserNotExistsException
import yaremchuken.fitnessterra.service.ExerciseService
import yaremchuken.fitnessterra.service.UserService

@RestController
@RequestMapping("api/exercise")
class ExerciseApi(
    userService: UserService,
    private val exerciseService: ExerciseService,
): BaseApi(userService) {
    @PostMapping
    @ResponseBody
    fun create(@RequestBody @NonNull body: ExerciseDto): ExerciseDto {
        val user = getUser() ?: throw UserNotExistsException()
        val exercise = exerciseService.create(user, body)
        return exerciseService.toDto(exercise)
    }

    @GetMapping
    @ResponseBody
    fun getAll(): List<ExerciseDto> {
        val user = getUser() ?: throw UserNotExistsException()
        return exerciseService.getAll(user).map { it -> exerciseService.toDto(it) }
    }
}
