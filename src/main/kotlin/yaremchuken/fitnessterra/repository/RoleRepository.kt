package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.Role
import yaremchuken.fitnessterra.model.UserRoleId

interface RoleRepository : JpaRepository<Role, UserRoleId>
