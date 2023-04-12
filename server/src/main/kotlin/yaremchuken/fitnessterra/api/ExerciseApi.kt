package yaremchuken.fitnessterra.api

import org.apache.commons.collections4.CollectionUtils
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
import yaremchuken.fitnessterra.service.MediaService
import yaremchuken.fitnessterra.service.dao.ExerciseTemplateService
import yaremchuken.fitnessterra.service.dao.UserService
import yaremchuken.fitnessterra.utils.Utils

@RestController
@RequestMapping("api/exercise")
class ExerciseApi(
    userService: UserService,
    private val exerciseTemplateService: ExerciseTemplateService,
    private val amazonS3Service: AmazonS3Service,
    private val mediaService: MediaService
): BaseApi(userService) {

    @GetMapping("previews")
    @ResponseBody
    fun getPreviews(@RequestParam @Nullable id: Collection<Long>?): List<ExercisePreviewDto> {
        val user = getUser()
        val previews =
            if (CollectionUtils.isNotEmpty(id)) exerciseTemplateService.get(user, id!!)
            else exerciseTemplateService.getAll(user)
        return previews.map { exerciseTemplateService.toPreviewDto(it, true) }
    }

    @PostMapping("template", headers = ["content-type=multipart/*"])
    @ResponseBody
    fun save(
        @RequestPart("exercise") dto: ExerciseDto,
        @RequestPart("media") media: MultipartFile?
    ): ExercisePreviewDto {
        val user = getUser()
        val exercise = exerciseTemplateService.save(user, dto)
        var preview: ByteArray? = null

        if (media != null && media.size != 0L) {
            preview = mediaService.createMediaPreview(media)

            val mediaUrl = Utils.createS3Url(MediaEntityType.EXERCISE_MEDIA, user, exercise.id!!)
            amazonS3Service.upload(mediaUrl, media.bytes)
            exercise.mediaUrl = mediaUrl

            val previewUrl = Utils.createS3Url(MediaEntityType.EXERCISE_PREVIEW, user, exercise.id!!)
            exercise.mediaPreviewUrl = previewUrl
            amazonS3Service.upload(previewUrl, preview)

            exerciseTemplateService.save(exercise)
        }

        return exerciseTemplateService.toPreviewDto(exercise, preview = preview)
    }

    @GetMapping("template/{id}")
    @ResponseBody
    fun get(@PathVariable @NonNull id: Long): ExerciseDto {
        val user = getUser()
        val exercise = exerciseTemplateService.get(id).orElseThrow { EntityNotExistsException() }
        if (user.id != exercise.user.id) throw EntityNotExistsException()

        return exerciseTemplateService.toExerciseDto(exercise, true, true)
    }
}
