package yaremchuken.fitnessterra.api.error

class UserNotExistsException(msg: String = "User does not exists") : RuntimeException() {
    override val message: String = msg
}
