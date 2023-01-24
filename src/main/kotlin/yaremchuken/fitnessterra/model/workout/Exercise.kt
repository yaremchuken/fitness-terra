package yaremchuken.fitnessterra.model.workout

import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import yaremchuken.fitnessterra.model.BaseEntity
import yaremchuken.fitnessterra.model.converter.EquipmentConverter

@Entity
@Table(name = "exercise")
class Exercise(
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "template_id", referencedColumnName = "id")
    val template: ExerciseTemplate,

    /**
     * Type of equipment using during the exercise.
     */
    @Convert(converter = EquipmentConverter::class)
    val equipment: Array<Equipment>,

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
    val calories: Int
): BaseEntity<Long>()
