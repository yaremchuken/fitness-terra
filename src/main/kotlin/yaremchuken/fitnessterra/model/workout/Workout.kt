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

/**
 * Workout binds to template.
 */
@Entity
@Table(name = "workout")
class Workout(
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "template_id", referencedColumnName = "id")
    val template: WorkoutTemplate,

    /**
     * Workout order in schedule.
     */
    val index: Int,

    /**
     * Is this workout completed.
     */
    val completed: Boolean,

    /**
     * Exercises included in this workout.
     */
    @ManyToMany(cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY)
    @JoinTable(
        name = "workout_exercises",
        joinColumns = [JoinColumn(name = "workout_id")],
        inverseJoinColumns = [JoinColumn(name = "exercise_id")])
    val exercises: MutableList<Exercise> = ArrayList(),
): BaseEntity<Long>()
