package yaremchuken.fitnessterra.model.workout

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import yaremchuken.fitnessterra.model.BaseEntity
import yaremchuken.fitnessterra.model.User

/**
 * Workout template contains list of exercises and breaks between them.
 */
@Entity
@Table(name = "workout_template")
class WorkoutTemplate(
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User,

    val title: String,

    /**
     * Exercises included in this workout.
     */
    @ManyToMany(cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY)
    @JoinTable(
        name = "workout_template_exercises",
        joinColumns = [JoinColumn(name = "workout_template_id")],
        inverseJoinColumns = [JoinColumn(name = "exercise_id")])
    val exercises: MutableList<Exercise> = ArrayList(),

    /**
     * Pauses between exercises, seconds.
     */
    val rests: Array<Int>
): BaseEntity<Long>()
