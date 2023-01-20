package yaremchuken.fitnessterra.api

import org.apache.commons.lang3.StringUtils
import org.springframework.lang.NonNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import yaremchuken.fitnessterra.api.dto.PreviewExerciseDto
import yaremchuken.fitnessterra.api.dto.TemplateExerciseDto
import yaremchuken.fitnessterra.api.error.EntityNotExistsException
import yaremchuken.fitnessterra.api.error.UserNotExistsException
import yaremchuken.fitnessterra.model.MediaEntityType
import yaremchuken.fitnessterra.service.AmazonS3Service
import yaremchuken.fitnessterra.service.dao.TemplateExerciseService
import yaremchuken.fitnessterra.service.dao.UserService
import yaremchuken.fitnessterra.utils.Utils

@RestController
@RequestMapping("api/exercise")
class ExerciseApi(
    userService: UserService,
    private val exerciseService: TemplateExerciseService,
    private val amazonS3Service: AmazonS3Service
): BaseApi(userService) {

    @GetMapping("previews")
    @ResponseBody
    fun getPreviews(): List<PreviewExerciseDto> {
        val user = getUser()
        return exerciseService.getAll(user).map { it -> PreviewExerciseDto.toDto(it) }
    }

    // TODO: if media was removed from template - remove it from S3
    @PostMapping("template", headers = ["content-type=multipart/*"])
    @ResponseBody
    fun save(
        @RequestPart("exercise") dto: TemplateExerciseDto,
        @RequestPart("media") media: MultipartFile?
    ): PreviewExerciseDto {
        val user = getUser()
        val exercise = exerciseService.save(user, dto)
        if (media != null && media.size > 0) {
            val url = Utils.createS3Url(MediaEntityType.EXERCISE_MEDIA, user, exercise.id!!)
            amazonS3Service.upload(url, media.bytes)
            exercise.mediaUrl = url
            exerciseService.save(exercise)
        }

        return PreviewExerciseDto.toDto(exercise)
    }

    @GetMapping("template/{id}")
    @ResponseBody
    fun get(@PathVariable @NonNull id: Long): TemplateExerciseDto {
        val user = getUser()
        val exercise = exerciseService.get(id).orElseThrow { EntityNotExistsException() }
        if (user.id != exercise.user.id) throw EntityNotExistsException()
        val dto = exerciseService.toDto(exercise)
        if (StringUtils.isNotBlank(exercise.mediaUrl)) {
            dto.media = amazonS3Service.download(Utils.createS3Url(MediaEntityType.EXERCISE_MEDIA, user, exercise.id!!))
        }
        return dto
    }
}
