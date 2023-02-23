import Exercise from '../../../../models/workout/Exercise'
import { secondsToString } from '../../../../utils/Utils'
import styles from './ExerciseRow.module.scss'

type ExerciseRowProps = {
  exercise: Exercise
}

const ExerciseRow = ({ exercise }: ExerciseRowProps) => {
  return (
    <li className={styles.row}>
      <div
        className={styles.preview}
        style={{
          backgroundImage: exercise.preview
            ? `url(${URL.createObjectURL(exercise.preview)})`
            : undefined,
        }}
      ></div>
      <div className={styles.block}>
        <p className={styles.title}>{exercise.title}</p>
        <div className={styles.amounts}>
          {exercise.duration ? (
            <div className={styles.amount}>{secondsToString(exercise.duration)}</div>
          ) : (
            <div className={styles.amount}>x{exercise.repeats}</div>
          )}
          {exercise.equipment.map((eq) => (
            <img
              key={eq.type}
              className={styles.equipment}
              src={`${process.env.PUBLIC_URL}/assets/images/equipment/${eq.type}.jpg`}
              alt={eq.type}
            />
          ))}
        </div>
        <p className={styles.description}>
          {exercise.description.length <= 240
            ? exercise.description
            : `${exercise.description.substring(0, 240)}...`}
        </p>
      </div>
    </li>
  )
}

export default ExerciseRow
