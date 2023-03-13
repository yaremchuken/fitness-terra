package yaremchuken.fitnessterra.utils

import yaremchuken.fitnessterra.model.MediaEntityType
import yaremchuken.fitnessterra.model.User

class Utils {
    companion object {
        fun createS3Url(entityType: MediaEntityType, user: User) =
            "${entityType.name.lowercase()}/uid-${user.id}/"

        fun createS3Url(entityType: MediaEntityType, user: User, entityId: Long) =
            "${createS3Url(entityType, user)}eid-${entityId}"
    }
}
