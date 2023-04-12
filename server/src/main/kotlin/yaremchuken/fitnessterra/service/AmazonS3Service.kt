package yaremchuken.fitnessterra.service

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.S3Object
import com.amazonaws.services.s3.model.S3ObjectInputStream
import com.amazonaws.util.IOUtils
import org.apache.commons.lang3.StringUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.CachePut
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import yaremchuken.fitnessterra.model.MediaEntityType
import yaremchuken.fitnessterra.model.User
import yaremchuken.fitnessterra.utils.Utils
import java.io.File
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.util.Date
import java.util.stream.Collectors

@Service
class AmazonS3Service(
    @Value("\${cloud.aws.bucket}") private val bucketName: String,
    private val amazonS3: AmazonS3
) {

    fun upload(key: String, bytes: ByteArray) {
        val temp = File("${System.getProperty("java.io.tmpdir")}/${key.replace("/", "-")}")
        temp.writeBytes(bytes)
        amazonS3.putObject(bucketName, key, temp)
        temp.deleteOnExit()
    }

    @Cacheable(value = ["media"], key = "#key")
    fun download(key: String?): ByteArray? {
        if (StringUtils.isBlank(key)) return null
        val data: S3Object = amazonS3.getObject(bucketName, key)
        val objectContent: S3ObjectInputStream = data.objectContent
        val bytes = IOUtils.toByteArray(objectContent)
        objectContent.close()
        return bytes
    }

    @CacheEvict(value = ["media"], key = "#key")
    fun delete(key: String) {
        amazonS3.deleteObject(bucketName, key)
    }

    fun temporalLink(key: String) =
        amazonS3.generatePresignedUrl(
            bucketName,
            key,
            Date.from(LocalDateTime.now().plusDays(1).toInstant(ZoneOffset.UTC)))

    fun getKeys(type: MediaEntityType, user: User): List<String> =
        amazonS3
            .listObjectsV2(bucketName, Utils.createS3Url(type, user))
            .objectSummaries
            .stream()
            .map { it.key }
            .collect(Collectors.toList())
}
