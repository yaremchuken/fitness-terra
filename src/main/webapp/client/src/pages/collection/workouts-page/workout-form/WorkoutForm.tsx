import { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { saveWorkout } from '../../../../actions/workout/WorkoutAction'
import Button from '../../../../components/form/button/Button'
import Loader from '../../../../components/loader/Loader'
import { MessageTone } from '../../../../components/message-popup/MessagePopup'
import { useDisplayMessage } from '../../../../hooks/UseDisplayMessage'
import { ExercisePreview } from '../../../../models/workout/Exercise'
import Workout from '../../../../models/workout/Workout'
import { StoreState } from '../../../../reducers/RootReducer'
import styles from './WorkoutForm.module.scss'

const maxDuration = 3600

type WorkoutFormProps = {
  previews: ExercisePreview[]
  workout: Workout
  save: (workout: Workout) => Promise<any>
  close: () => void
}

const WorkoutForm = ({ previews, workout, save, close }: WorkoutFormProps) => {
  const displayMessage = useDisplayMessage()

  const [loader, setLoader] = useState<string | undefined>()
  const [workoutData, setWorkoutData] = useState<Workout>(workout)
  const [inProcess, setInProcess] = useState(false)

  const formatTime = (seconds: number) => {
    if (seconds > maxDuration) seconds = maxDuration
    const mins = Math.floor(seconds / 60)
    const secs = seconds - mins * 60
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const toSecs = (time: string, onEmpty: number = 0) => {
    if (/^\d+$/.test(time)) return +time
    if (time.includes(':')) {
      const tm = time.split(':')
      if (Number.isNaN(+tm[0]) || Number.isNaN(+tm[1])) return onEmpty
      return Math.min(maxDuration, +tm[1] + +tm[0] * 60)
    }

    return onEmpty
  }

  //   const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //     let value: string | number = event.target.value
  //     if (event.target.name === 'break') {
  //       value = toSecs(value, workoutData.duration)
  //     }
  //     setWorkoutData({ ...workoutData, [event.target.name]: value })
  //   }

  const onSubmit = () => {
    setInProcess(true)
    setLoader('Uploading Workout Data')
    save(workoutData)
      .then(() => {
        displayMessage('Workout successfuly saved')
        close()
      })
      .catch(() => displayMessage('Unable to save workout!', MessageTone.ERROR))
      .finally(() => {
        setInProcess(false)
        setLoader(undefined)
      })
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {loader && <Loader message={loader} />}
      <div className={styles.controls}>
        <Button text='SAVE' disabled={inProcess} callback={onSubmit} />
        <Button text='CANCEL' disabled={inProcess} callback={close} />
      </div>
    </form>
  )
}

const mapStateToProps = ({ exercise }: StoreState) => ({
  previews: exercise.previews,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    save: (workout: Workout) => saveWorkout(workout)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutForm)
