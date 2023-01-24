package yaremchuken.fitnessterra.model.workout

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToMany
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import yaremchuken.fitnessterra.model.BaseEntity
import yaremchuken.fitnessterra.model.User

/**
 * List of exercises.
 */
@Entity
@Table(name = "workout")
class Workout(
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User,

    val title: String,

    /**
     * Exercises included in this workout.
     */
    @ManyToMany(cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY)
    val exercises: MutableList<Exercise> = ArrayList(),

    /**
     * Pauses between exercises, seconds.
     */
    val breaks: Array<Int>
): BaseEntity<Long>()
