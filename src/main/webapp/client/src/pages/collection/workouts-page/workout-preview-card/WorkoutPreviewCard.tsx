import { WorkoutPreview } from '../../../../models/workout/Workout'
import ExerciseBlock, { IndexedExercise } from '../exercise-block/ExerciseBlock'
import styles from './WorkoutPreviewCard.module.scss'

type WorkoutPreviewCardProps = {
  preview?: WorkoutPreview
  callback?: (preview?: WorkoutPreview) => void
}

const WorkoutPreviewCard = ({ preview, callback }: WorkoutPreviewCardProps) => {
  return (
    <li
      className={`${styles.card} ${callback ? styles.pointer : ''}`}
      onClick={() => (callback ? callback(preview) : {})}
    >
      {preview ? (
        <div className={styles.inner}>
          <p className={styles.title}>{preview.title}</p>
          <ul className={styles.exercises}>
            {preview.previews.map((ex) => (
              <ExerciseBlock key={ex.index} exercise={ex} />
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.add}></div>
      )}
    </li>
  )
}

export default WorkoutPreviewCard
