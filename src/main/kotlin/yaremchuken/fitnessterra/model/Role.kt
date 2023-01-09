package yaremchuken.fitnessterra.model

import jakarta.persistence.Embeddable
import jakarta.persistence.EmbeddedId
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import org.springframework.security.core.GrantedAuthority
import java.io.Serializable

@Entity
@Table(name = "role")
class Role (
    @EmbeddedId
    val id: UserRoleId
)

@Embeddable
class UserRoleId (
    @Enumerated(EnumType.STRING)
    val role: RoleType,

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User
) : Serializable

enum class RoleType(private val role: String) : GrantedAuthority {
    GAMER("GAMER"),
    ADMIN("ADMIN");

    override fun getAuthority() = role
}
