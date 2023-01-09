package yaremchuken.fitnessterra.api.error

class UserAlreadyExistsException(msg: String = "User already exists") : RuntimeException() {
    override val message: String = msg
}
