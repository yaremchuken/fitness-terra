import { useDisplayMessage } from '../../../hooks/UseDisplayMessage'
import styles from './MediaUpload.module.scss'

type MediaUploadProps = {
  title: string
  maxSize: number // Size of media in KB
  media?: File
  disabled?: boolean
  onUpload: (media: File) => void
  onClear: () => void
}

const MediaUpload = ({ title, maxSize, media, disabled, onUpload, onClear }: MediaUploadProps) => {
  const displayMessage = useDisplayMessage()

  const checkUpload = (file: File) => {
    if (file.size / 1024 <= maxSize) onUpload(file)
    else {
      displayMessage(`File is too large, max size is ${maxSize} KB`)
    }
  }

  return (
    <div className={styles.mediaUpload}>
      <p className={styles.title}>{title}</p>
      {media ? (
        <div className={styles.preview}>
          <img className={styles.uploaded} src={URL.createObjectURL(media)} alt={title}></img>
          <button
            className={styles.clearBtn}
            onClick={() => {
              if (!disabled) onClear()
            }}
            disabled={disabled}
          ></button>
        </div>
      ) : (
        <div className={styles.mediaInput}>
          <input
            name='media'
            type='file'
            id='mediaUpload'
            accept='image/*'
            hidden
            onChange={(e) => {
              if (!disabled) {
                const img = e.target.files?.item(0)
                if (img) checkUpload(img)
                else onClear()
              }
            }}
            disabled={disabled}
          />
          <label htmlFor='mediaUpload' className={styles.inputLabel}>
            + Add image or gif animation
          </label>
        </div>
      )}
    </div>
  )
}

export default MediaUpload
