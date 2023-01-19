package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.model.Media
import yaremchuken.fitnessterra.model.MediaEntityType
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.repository.MediaRepository

@Service
class MediaService(private val repository: MediaRepository) {
    fun save(media: Media) = repository.save(media)

    fun getMedias(user: User, entityId: Long, entityTypes: List<MediaEntityType>) =
        repository.getByUserAndEntityIdAndEntityTypeIsIn(user, entityId, entityTypes)
}
