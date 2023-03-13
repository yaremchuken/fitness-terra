package yaremchuken.fitnessterra.api.error

class InvalidCredentialsException(msg: String = "Invalid user credentials") : RuntimeException() {
    override val message: String = msg
}
