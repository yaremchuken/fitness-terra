package yaremchuken.fitnessterra.service

import org.imgscalr.Scalr
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.ByteArrayOutputStream
import javax.imageio.ImageIO

const val PREVIEW_SIZE = 256

@Service
class MediaService {

    fun createMediaPreview(media: MultipartFile): ByteArray {
        val image = ImageIO.read(media.inputStream)
        val resized = Scalr.resize(image, PREVIEW_SIZE)

        val filename = media.originalFilename ?: ".prv"
        val ext = filename.substring(filename.lastIndexOf(".") + 1, filename.length)

        val baos = ByteArrayOutputStream()
        ImageIO.write(resized, ext, baos);
        baos.flush();

        return baos.toByteArray()
    }
}