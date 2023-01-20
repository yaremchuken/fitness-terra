package yaremchuken.fitnessterra.service

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.S3Object
import com.amazonaws.services.s3.model.S3ObjectInputStream
import com.amazonaws.util.IOUtils
import org.springframework.beans.factory.annotation.Value
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
    fun upload(fileName: String, bytes: ByteArray) {
        val temp = File("${System.getProperty("java.io.tmpdir")}/${fileName.replace("/", "-")}")
        temp.writeBytes(bytes)
        amazonS3.putObject(bucketName, fileName, temp)
        temp.deleteOnExit()
    }

    fun download(fileName: String): ByteArray {
        val data: S3Object = amazonS3.getObject(bucketName, fileName)
        val objectContent: S3ObjectInputStream = data.objectContent
        val bytes = IOUtils.toByteArray(objectContent)
        objectContent.close()
        return bytes
    }

    fun delete(fileName: String) {
        amazonS3.deleteObject(bucketName, fileName)
    }

    fun temporalLink(fileName: String) =
        amazonS3.generatePresignedUrl(
            bucketName,
            fileName,
            Date.from(LocalDateTime.now().plusDays(1).toInstant(ZoneOffset.UTC)))

    fun getKeys(type: MediaEntityType, user: User): List<String> =
        amazonS3
            .listObjectsV2(bucketName, Utils.createS3Url(type, user))
            .objectSummaries
            .stream()
            .map { it.key }
            .collect(Collectors.toList())
}
