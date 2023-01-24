package yaremchuken.fitnessterra.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import yaremchuken.fitnessterra.api.dto.WorkoutPreviewDto
import yaremchuken.fitnessterra.service.dao.UserService
import yaremchuken.fitnessterra.service.dao.WorkoutService

@RestController
@RequestMapping("api/workout")
class WorkoutApi(
    userService: UserService,
    private val workoutService: WorkoutService
): BaseApi(userService) {

    @GetMapping("previews")
    @ResponseBody
    fun getPreviews(): List<WorkoutPreviewDto> {
        val user = getUser()
        val previews = workoutService.getAll(user)
        val dtos = previews.map { it -> WorkoutPreviewDto.toDto(it) }
        return dtos
    }
}
