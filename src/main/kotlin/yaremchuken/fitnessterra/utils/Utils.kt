package yaremchuken.fitnessterra.utils

import yaremchuken.fitnessterra.model.MediaEntityType
import yaremchuken.fitnessterra.model.User
import java.util.concurrent.Callable

class Utils {
    companion object {
        fun createS3Url(entityType: MediaEntityType, user: User, entityId: Long) =
            "${entityType.name.lowercase()}/uid-${user.id}/eid-${entityId}"
    }
}
