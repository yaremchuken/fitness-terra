import { useState } from 'react'
import styles from './MediaUpload.module.scss'

type MediaUploadProps = {
  onUpload: (media: File) => void
  onClear: () => void
}

const MediaUpload = ({ onUpload, onClear }: MediaUploadProps) => {
  const [preview, setPreview] = useState<string | undefined>()

  return (
    <div className={styles.mediaUpload}>
      <p className={styles.title}>Exercise Preview</p>
      {preview ? (
        <div className={styles.preview}>
          <img className={styles.uploaded} src={preview}></img>
          <button
            className={styles.clearBtn}
            onClick={() => {
              setPreview(undefined)
              onClear()
            }}
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
              const img = e.target.files?.item(0)
              if (img) {
                onUpload(img)
                setPreview(URL.createObjectURL(img))
              } else {
                setPreview(undefined)
                onClear()
              }
            }}
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
