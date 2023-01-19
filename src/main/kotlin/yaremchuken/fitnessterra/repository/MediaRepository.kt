package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.Media
import yaremchuken.fitnessterra.model.MediaEntityType
import yaremchuken.fitnessterra.model.User

interface MediaRepository: JpaRepository<Media, Long> {
    fun getByUserAndEntityIdAndEntityTypeIsIn(user: User, entityId: Long, entityType: List<MediaEntityType>): List<Media>
}
