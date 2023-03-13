package yaremchuken.fitnessterra.model

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import yaremchuken.fitnessterra.model.workout.Workout
import java.time.LocalDate

@Entity
@Table(name = "schedule")
class Schedule(
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User,

    /**
     * Date on which this schedule is scheduled
     */
    val scheduledAt: LocalDate,

    /**
     * Workouts included in this schedule.
     */
    @ManyToMany(cascade = [(CascadeType.ALL)], fetch = FetchType.LAZY)
    @JoinTable(
        name = "schedule_workouts",
        joinColumns = [JoinColumn(name = "schedule_id")],
        inverseJoinColumns = [JoinColumn(name = "workout_id")])
    val workouts: MutableList<Workout> = ArrayList()
): BaseEntity<Long>()
