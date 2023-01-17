package yaremchuken.fitnessterra.model.workout

import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import yaremchuken.fitnessterra.model.BaseEntity
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.model.converter.EquipmentConverter

/**
 * Basic exercise
 * Can contain amount of repetitions (like for push-back) or duration of exercise (like for jumping jack)
 */
@Entity
@Table(name = "template_exercise")
class TemplateExercise(
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User,

    val title: String,

    @Enumerated(EnumType.STRING)
    val type: ActivityType,

    /**
     * Muscles affected by exercise.
     */
    val muscleGroups: Array<MuscleGroup>,

    /**
     * Amount of repetitions.
     */
    val repeats: Int,

    /**
     * Duration of exercise in seconds.
     */
    val duration: Int,

    /**
     * Amount of calories loss while exercising.
     */
    val calories: Int,

    /**
     * Type of equipment using during the exercise.
     */
    @Convert(converter = EquipmentConverter::class)
    val equipment: Array<Equipment>,
): BaseEntity<Long>()