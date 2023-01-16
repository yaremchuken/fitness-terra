package yaremchuken.fitnessterra.model.converter

import yaremchuken.fitnessterra.model.workout.Equipment

class EquipmentConverter: JsonConverter<Array<Equipment>>() {
    override fun convertToEntityAttribute(dbData: String?): Array<Equipment> =
        if (dbData === null) arrayOf() else mapper.readValue(dbData, Array<Equipment>::class.java)
}
