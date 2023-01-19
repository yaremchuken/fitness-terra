package yaremchuken.fitnessterra.model

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "media")
class Media(
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User,

    val entityId: Long,

    @Enumerated(EnumType.STRING)
    val entityType: MediaEntityType,

    val url: String
): BaseEntity<Long>()
