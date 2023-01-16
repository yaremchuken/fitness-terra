package yaremchuken.fitnessterra.model.converter

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.persistence.AttributeConverter

abstract class JsonConverter<T>: AttributeConverter<T, String> {

    // private val jsonb: Jsonb = JsonbBuilder.create()
    //
    protected val mapper = ObjectMapper()
    //
    // override fun convertToDatabaseColumn(attribute: T?): String? =
    //     if (attribute == null) null else mapper.writeValueAsString(attribute) //jsonb.toJson(attribute)
    //
    // inline fun <reified T> generic() = T::class.java.getConstructor().newInstance()
    //
    // private inline fun <reified T> ObjectMapper.readValue(s: String): T = this.readValue(s, object : TypeReference<T>() {})
    //
    // override fun convertToEntityAttribute(dbData: String?): T? =
    //     if (dbData == null) null else mapper.readValue(dbData, TypeReference<T>() {}) // jsonb.fromJson(dbData, generic<Class<T>>()::class)
    override fun convertToDatabaseColumn(attribute: T?): String? =
        if (attribute == null) null else mapper.writeValueAsString(attribute)
}
