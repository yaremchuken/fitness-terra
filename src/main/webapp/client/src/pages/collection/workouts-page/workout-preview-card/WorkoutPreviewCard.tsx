import { WorkoutPreview } from '../../../../models/workout/Workout'
import styles from './WorkoutPreviewCard.module.scss'

type WorkoutPreviewCardProps = {
  preview?: WorkoutPreview
  callback: (preview?: WorkoutPreview) => void
}

const WorkoutPreviewCard = ({ preview, callback }: WorkoutPreviewCardProps) => {
  return (
    <li className={styles.card} onClick={() => callback(preview)}>
      {preview ? (
        <div className={styles.inner}>
          <p className={styles.title}>{preview.title}</p>
        </div>
      ) : (
        <div className={styles.add}></div>
      )}
    </li>
  )
}

export default WorkoutPreviewCard
