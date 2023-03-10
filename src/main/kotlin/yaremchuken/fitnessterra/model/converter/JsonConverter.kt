package yaremchuken.fitnessterra.model.converter

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.persistence.AttributeConverter

abstract class JsonConverter<T>: AttributeConverter<T, String> {

    protected val mapper = ObjectMapper()

    override fun convertToDatabaseColumn(attribute: T?): String? =
        if (attribute == null) null else mapper.writeValueAsString(attribute)
}
