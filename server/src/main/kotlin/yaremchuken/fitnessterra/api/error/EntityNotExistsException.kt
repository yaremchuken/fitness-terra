package yaremchuken.fitnessterra.api.error

class EntityNotExistsException(msg: String = "Entity does not exists") : RuntimeException() {
    override val message: String = msg
}
