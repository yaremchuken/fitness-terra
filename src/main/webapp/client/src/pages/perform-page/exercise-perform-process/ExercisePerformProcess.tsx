import { useEffect, useState } from 'react'
import Button from '../../../components/form/button/Button'
import Exercise from '../../../models/workout/Exercise'
import { secondsToString } from '../../../utils/Utils'
import styles from './ExercisePerformProcess.module.scss'

type ExercisePerformProcessProps = {
  exercise: Exercise
}

const ExercisePerformProcess = ({ exercise }: ExercisePerformProcessProps) => {
  const [counter, setCounter] = useState(exercise.duration ?? exercise.repeats)

  useEffect(() => {
    const timer = setInterval(countDown, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [counter])

  const countDown = () => {
    setCounter(counter - 1)
  }

  const pause = () => {}

  const skip = () => {}

  return (
    <div className={styles.performProcess}>
      <div className={styles.title}>{exercise.title}</div>
      {exercise.media && (
        <img
          className={styles.media}
          src={URL.createObjectURL(exercise.media)}
          alt={exercise.title}
        />
      )}
      <div className={styles.counter}>
        {exercise.duration ? secondsToString(counter) : `x${counter}`}
      </div>
      <div className={styles.controls}>
        <Button text='|| PAUSE' callback={pause} big />
        <Button text='>> SKIP' callback={skip} big />
      </div>
    </div>
  )
}

export default ExercisePerformProcess
