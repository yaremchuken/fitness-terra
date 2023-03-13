package yaremchuken.fitnessterra.service.dao

import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.Role
import yaremchuken.fitnessterra.model.RoleType
import yaremchuken.fitnessterra.model.UserRoleId
import yaremchuken.fitnessterra.repository.RoleRepository

@Service
class RoleService (private val repository: RoleRepository) {
    fun create(user: User, role: RoleType): Role = repository.save(Role(UserRoleId(role, user)))
}
