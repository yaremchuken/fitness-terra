package yaremchuken.fitnessterra.api

import org.springframework.lang.NonNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import yaremchuken.fitnessterra.api.dto.TemplateExerciseDto
import yaremchuken.fitnessterra.api.error.UserNotExistsException
import yaremchuken.fitnessterra.service.dao.TemplateExerciseService
import yaremchuken.fitnessterra.service.dao.UserService

@RestController
@RequestMapping("api/exercise")
class ExerciseApi(
    userService: UserService,
    private val exerciseService: TemplateExerciseService,
): BaseApi(userService) {
    @PostMapping("template")
    @ResponseBody
    fun save(@RequestBody @NonNull body: TemplateExerciseDto): TemplateExerciseDto {
        val user = getUser() ?: throw UserNotExistsException()
        val exercise = exerciseService.save(user, body)
        return exerciseService.toDto(exercise)
    }

    @GetMapping("template")
    @ResponseBody
    fun getAll(): List<TemplateExerciseDto> {
        val user = getUser() ?: throw UserNotExistsException()
        return exerciseService.getAll(user).map { it -> exerciseService.toDto(it) }
    }
}
