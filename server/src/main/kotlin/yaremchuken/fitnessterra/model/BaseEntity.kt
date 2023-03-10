package yaremchuken.fitnessterra.model

import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import org.springframework.data.util.ProxyUtils
import java.io.Serializable
import java.time.Instant

@MappedSuperclass
abstract class BaseEntity<T : Serializable> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: T? = null

    @CreationTimestamp
    var createdAt: Instant? = null

    @UpdateTimestamp
    var updatedAt: Instant? = null

    override fun equals(other: Any?): Boolean {
        other ?: return false

        if (this === other) return true

        if (javaClass != ProxyUtils.getUserClass(other)) return false

        other as BaseEntity<*>

        return this.id != null && this.id == other.id
    }

    override fun hashCode(): Int {
        return 25
    }

    override fun toString(): String {
        return "${this.javaClass.simpleName}(id=$id)"
    }
}
