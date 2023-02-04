package yaremchuken.fitnessterra.api

import org.apache.commons.collections4.CollectionUtils
import org.apache.commons.lang3.StringUtils
import org.springframework.lang.NonNull
import org.springframework.lang.Nullable
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import yaremchuken.fitnessterra.api.dto.ExercisePreviewDto
import yaremchuken.fitnessterra.api.dto.ExerciseDto
import yaremchuken.fitnessterra.api.error.EntityNotExistsException
import yaremchuken.fitnessterra.model.MediaEntityType
import yaremchuken.fitnessterra.service.AmazonS3Service
import yaremchuken.fitnessterra.service.dao.ExerciseTemplateService
import yaremchuken.fitnessterra.service.dao.UserService
import yaremchuken.fitnessterra.utils.Utils
import java.util.Collections

@RestController
@RequestMapping("api/exercise")
class ExerciseApi(
    userService: UserService,
    private val exerciseTemplateService: ExerciseTemplateService,
    private val amazonS3Service: AmazonS3Service
): BaseApi(userService) {

    // TODO: Cache binary files (exercise previews, etc...) in Redis

    @GetMapping("previews")
    @ResponseBody
    fun getPreviews(@RequestParam @Nullable id: Collection<Long>?): List<ExercisePreviewDto> {
        val user = getUser()
        val previews =
            if (CollectionUtils.isNotEmpty(id)) exerciseTemplateService.get(user, id!!)
            else exerciseTemplateService.getAll(user)
        return previews.map { exerciseTemplateService.toPreviewDto(it, true) }
    }

    // TODO: if media was removed from template - remove it from S3
    @PostMapping("template", headers = ["content-type=multipart/*"])
    @ResponseBody
    fun save(
        @RequestPart("exercise") dto: ExerciseDto,
        @RequestPart("preview") preview: MultipartFile?,
        @RequestPart("media") media: MultipartFile?
    ): ExercisePreviewDto {
        val user = getUser()
        val exercise = exerciseTemplateService.save(user, dto)
        if (preview != null || media != null) {
            if (preview != null && preview.size > 0) {
                val url = Utils.createS3Url(MediaEntityType.EXERCISE_PREVIEW, user, exercise.id!!)
                amazonS3Service.upload(url, preview.bytes)
                exercise.previewUrl = url
            }
            if (media != null && media.size > 0) {
                val url = Utils.createS3Url(MediaEntityType.EXERCISE_MEDIA, user, exercise.id!!)
                amazonS3Service.upload(url, media.bytes)
                exercise.mediaUrl = url
            }
            exerciseTemplateService.save(exercise)
        }

        return exerciseTemplateService.toPreviewDto(exercise, preview = preview?.bytes)
    }

    @GetMapping("template/{id}")
    @ResponseBody
    fun get(@PathVariable @NonNull id: Long): ExerciseDto {
        val user = getUser()
        val exercise = exerciseTemplateService.get(id).orElseThrow { EntityNotExistsException() }
        if (user.id != exercise.user.id) throw EntityNotExistsException()

        return exerciseTemplateService.toExerciseDto(exercise)
    }
}
