import { useEffect, useState } from 'react'
import Button from '../../../components/form/button/Button'
import Exercise from '../../../models/workout/Exercise'
import { secondsToString } from '../../../utils/Utils'
import thumbUpImg from '../../../img/thumbs_up.gif'
import styles from './ExercisePerformProcess.module.scss'

export type BreakInfo = {
  duration: number
  next: Exercise
}

type ExercisePerformProcessProps = {
  exercise?: Exercise
  breakInfo?: BreakInfo
  onComplete: () => void
}

const ExercisePerformProcess = ({
  exercise,
  breakInfo,
  onComplete,
}: ExercisePerformProcessProps) => {
  const countRepeats = exercise && exercise.repeats > 0

  let count = 0
  let doneFlg = false
  let finishingAnimPlayTill = 0
  const [, setTickFlag] = useState(0)
  const [startedAt, setStartedAt] = useState(0)
  const [counter, setCounter] = useState(count)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const started = new Date().getTime()
    setStartedAt(started)
    const timer = setInterval(() => tick(started), 30)

    doneFlg = false
    setDone(doneFlg)

    return () => {
      clearInterval(timer)
    }
  }, [exercise, breakInfo])

  const tick = (startedAt: number) => {
    if (!doneFlg) {
      const secsHasPassed = (new Date().getTime() - startedAt) * 0.001
      count = countRepeats
        ? Math.floor(secsHasPassed)
        : getProcessDuration() - Math.floor(secsHasPassed)
      setCounter(count)
      setTickFlag(Math.random)
      if ((countRepeats && count === exercise.repeats) || (!countRepeats && count === 0)) {
        if (exercise) {
          doneFlg = true
          finishingAnimPlayTill = new Date().getTime() + 2000
          setDone(doneFlg)
        } else onComplete()
      }
    } else {
      if (finishingAnimPlayTill < new Date().getTime()) onComplete()
    }
  }

  const getProcessDuration = () =>
    exercise ? exercise.duration : breakInfo ? breakInfo.duration : 0

  const pause = () => {
    console.log('PAUSE ME')
  }

  const skip = () => {
    onComplete()
  }

  const exerciseDisplay = (
    <>
      {exercise?.media && (
        <img
          className={styles.media}
          src={URL.createObjectURL(exercise.media)}
          alt={exercise.title}
        />
      )}
      <div className={styles.counter}>
        {exercise?.duration ? secondsToString(counter) : `${counter} of ${exercise?.repeats}`}
      </div>
    </>
  )

  const breakDisplay = (
    <>
      <div className={styles.breakTimer}></div>
      <div className={styles.nextInfo}>{breakInfo?.next.title}</div>
      <div className={styles.counter}>{breakInfo?.duration && secondsToString(counter)}</div>
    </>
  )

  const progress = () => {
    const millisHasPassed = new Date().getTime() - startedAt
    const millisTotal = (countRepeats ? exercise.repeats : getProcessDuration()) * 1000
    return (millisHasPassed / millisTotal) * 100
  }

  return (
    <div className={styles.performProcess}>
      <div className={styles.title}>{exercise ? exercise.title : 'Break Time'}</div>
      {exercise ? exerciseDisplay : breakDisplay}
      <div className={styles.progressHolder}>
        <img
          className={`${styles.thumbUp} ${exercise && done ? styles.visible : ''}`}
          src={thumbUpImg}
          alt='Done'
        />
        <div className={styles.progressBar} style={{ width: `${progress()}%` }}></div>
      </div>
      <div className={styles.controls}>
        {/* <Button text='|| PAUSE' callback={pause} big disabled /> */}
        <Button text='>> SKIP' callback={skip} big />
      </div>
    </div>
  )
}

export default ExercisePerformProcess
