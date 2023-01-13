import Exercise from '../../../models/exercise/Exercise'
import styles from './ExerciseCard.module.scss'

type ExerciseCardProps = {
  exercise?: Exercise
  callback: (exercise?: Exercise) => void
}

const ExerciseCard = ({ exercise, callback }: ExerciseCardProps) => {
  return (
    <li className={styles.card} onClick={() => callback(exercise)}>
      {exercise ? (
        <div className={styles.title}>{exercise.title}</div>
      ) : (
        <div className={styles.add}>+</div>
      )}
    </li>
  )
}

export default ExerciseCard
