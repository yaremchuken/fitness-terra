import Button from '../../../components/form/button/Button'
import Workout from '../../../models/workout/Workout'
import ExerciseRow from './exercise-row/ExerciseRow'
import styles from './ExercisesList.module.scss'

type ExercisesListProps = {
  workout: Workout
  onCancel: () => void
  onPerform: () => void
}

const ExercisesList = ({ workout, onPerform, onCancel }: ExercisesListProps) => {
  return (
    <div className={styles.block}>
      <p className={styles.title}>{workout.title}</p>
      <ul className={styles.exercises}>
        {workout.exercises.map((ex) => (
          <ExerciseRow key={ex.id} exercise={ex} />
        ))}
      </ul>
      <div className={styles.controls}>
        <Button text='PERFORM' callback={onPerform} />
        <Button text='CANCEL' callback={onCancel} />
      </div>
    </div>
  )
}

export default ExercisesList
