package yaremchuken.fitnessterra.api

import org.springframework.lang.NonNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import yaremchuken.fitnessterra.api.error.UserNotExistsException
import yaremchuken.fitnessterra.model.Media
import yaremchuken.fitnessterra.model.MediaEntityType
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.service.AmazonS3Service
import yaremchuken.fitnessterra.service.dao.MediaService
import yaremchuken.fitnessterra.service.dao.UserService

@RestController
@RequestMapping("api/media")
class MediaApi(
    userService: UserService,
    private val s3Service: AmazonS3Service,
    private val mediaService: MediaService
): BaseApi(userService) {

    @PostMapping(headers = ["content-type=multipart/*"])
    fun upload(
        @RequestParam("media") @NonNull media: MultipartFile,
        @RequestParam("id") @NonNull entityId: Long,
        @RequestParam("type") @NonNull entityType: MediaEntityType
    ) {
        val user = getUser() ?: throw UserNotExistsException()
        val url = createUrl(user, entityId, entityType)
        s3Service.upload(url, media.bytes)
        mediaService.save(Media(user, entityId, entityType, url))
    }

    @GetMapping
    fun get(
        @RequestParam("id") @NonNull entityId: Long,
        @RequestParam("types") @NonNull entityTypes: List<MediaEntityType>
    ): List<ByteArray> {
        val user = getUser() ?: throw UserNotExistsException()
        val medias = mediaService.getMedias(user, entityId, entityTypes)
        val list: MutableList<ByteArray> = ArrayList()
        for (media in medias) {
            list.add(s3Service.download(createUrl(user, media.entityId, media.entityType)))
        }
        return list
    }

    fun createUrl(user: User, entityId: Long, entityType: MediaEntityType) =
        "${entityType.name.lowercase()}/uid-${user.id}_eid-${entityId}"
}
