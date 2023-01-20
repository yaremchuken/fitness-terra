import { useState } from 'react'
import styles from './MediaUpload.module.scss'

type MediaUploadProps = {
  media?: File
  onUpload: (media: File) => void
  onClear: () => void
}

const MediaUpload = ({ media, onUpload, onClear }: MediaUploadProps) => {
  return (
    <div className={styles.mediaUpload}>
      <p className={styles.title}>Exercise Preview</p>
      {media ? (
        <div className={styles.preview}>
          <img className={styles.uploaded} src={URL.createObjectURL(media)}></img>
          <button
            className={styles.clearBtn}
            onClick={() => {
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
              if (img) onUpload(img)
              else onClear()
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
