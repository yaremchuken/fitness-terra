import ImgButton from '../../../components/img-button/ImgButton'
import { WorkoutPreview } from '../../../models/workout/Workout'
import WorkoutPreviewCard from '../../collection/workouts-page/workout-preview-card/WorkoutPreviewCard'
import styles from './WorkoutBlock.module.scss'

type WorkoutBlockProps = {
  workout: WorkoutPreview
  onChangeExercise?: (index: number, type: string, value: number) => void
  onRemove?: () => void
}

const WorkoutBlock = ({ workout, onChangeExercise, onRemove }: WorkoutBlockProps) => {
  const removeListener = () => {
    if (onRemove) onRemove()
  }

  return (
    <div className={styles.block}>
      <ImgButton callback={removeListener} />
      <WorkoutPreviewCard preview={workout} onExerciseChange={onChangeExercise} large />
    </div>
  )
}

export default WorkoutBlock
