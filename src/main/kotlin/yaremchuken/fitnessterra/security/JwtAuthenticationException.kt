package yaremchuken.fitnessterra.security

class JwtAuthenticationException(msg: String = "JWT token is invalid") : RuntimeException() {
    override val message: String = msg
}
