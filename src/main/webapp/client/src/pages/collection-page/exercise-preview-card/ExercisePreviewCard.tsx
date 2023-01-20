import { ExercisePreview } from '../../../models/exercise/Exercise'
import styles from './ExercisePreviewCard.module.scss'

type ExercisePreviewCardProps = {
  preview?: ExercisePreview
  callback: (preview?: ExercisePreview) => void
}

const ExercisePreviewCard = ({ preview, callback }: ExercisePreviewCardProps) => {
  return (
    <li className={styles.card} onClick={() => callback(preview)}>
      {preview ? (
        <div className={styles.title}>{preview.title}</div>
      ) : (
        <div className={styles.add}></div>
      )}
    </li>
  )
}

export default ExercisePreviewCard
