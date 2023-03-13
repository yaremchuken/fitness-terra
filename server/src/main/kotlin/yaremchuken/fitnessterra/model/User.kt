package yaremchuken.fitnessterra.model

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "user")
class User(
    val username: String,

    val password: String,

    var refreshToken: String,

    var tokenIssuedAt: Instant,

    @OneToMany(cascade = [(CascadeType.ALL)], fetch = FetchType.EAGER, mappedBy = "id.user")
    val roles: MutableList<Role> = ArrayList()
): BaseEntity<Long>()
