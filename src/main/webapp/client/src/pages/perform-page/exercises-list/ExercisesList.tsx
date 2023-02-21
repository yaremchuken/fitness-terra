import Workout from '../../../models/workout/Workout'
import styles from './ExercisesList.module.scss'

type ExercisesListProps = {
  workout: Workout
}

const ExercisesList = ({ workout }: ExercisesListProps) => {
  return (
    <div className={styles.block}>
      <p className={styles.title}>{workout.title}</p>
    </div>
  )
}

export default ExercisesList
