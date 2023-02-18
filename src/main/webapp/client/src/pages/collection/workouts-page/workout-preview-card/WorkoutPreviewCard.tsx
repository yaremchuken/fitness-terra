import { WorkoutPreview } from '../../../../models/workout/Workout'
import ExerciseBlock from '../exercise-block/ExerciseBlock'
import styles from './WorkoutPreviewCard.module.scss'

type WorkoutPreviewCardProps = {
  preview?: WorkoutPreview
  callback?: (preview?: WorkoutPreview) => void
  onExerciseChange?: (index: number, type: string, value: number) => void
  large?: boolean
}

const WorkoutPreviewCard = ({
  preview,
  callback,
  onExerciseChange,
  large,
}: WorkoutPreviewCardProps) => {
  return (
    <li
      className={`${styles.card} ${callback ? styles.pointer : ''} ${large ? styles.large : ''}`}
      onClick={() => (callback ? callback(preview) : {})}
    >
      {preview ? (
        <div className={styles.inner}>
          <p className={styles.title}>{preview.title}</p>
          <ul className={styles.exercises}>
            {preview.previews.map((ex) => (
              <ExerciseBlock
                key={ex.index}
                exercise={ex}
                onChange={
                  onExerciseChange
                    ? (type, value) => onExerciseChange(ex.index, type, value)
                    : undefined
                }
              />
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
