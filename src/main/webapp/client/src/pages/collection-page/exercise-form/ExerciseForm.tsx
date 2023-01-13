import { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { create } from '../../../actions/exercise/ExerciseAction'
import Button from '../../../components/form/button/Button'
import Input from '../../../components/form/input/Input'
import { MessageTone } from '../../../components/message-popup/MessagePopup'
import { useDisplayMessage } from '../../../hooks/UseDisplayMessage'
import Exercise from '../../../models/exercise/Exercise'
import { ExerciseType } from '../../../models/exercise/ExerciseType'
import styles from './ExerciseForm.module.scss'

const maxDuration = 3600

type ExerciseFormProps = {
  create: (exercise: Exercise) => Promise<any>
  editComplete: () => void
}

const ExerciseForm = ({ create, editComplete }: ExerciseFormProps) => {
  const displayMessage = useDisplayMessage()

  const [exerciseData, setExerciseData] = useState<Exercise>({
    title: '',
    type: ExerciseType.CARDIO,
    muscleGroups: [],
    repeats: 0,
    duration: 0,
    calories: 0,
    equipments: [],
    weights: [],
  })
  const [inProcess, setInProcess] = useState(false)

  const formatTime = (seconds: number) => {
    if (seconds > maxDuration) seconds = maxDuration
    const mins = Math.floor(seconds / 60)
    const secs = seconds - mins * 60
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // TODO: Drop down menu for repeats and duration

  const toSecs = (time: string, onEmpty: number = 0) => {
    if (/^\d+$/.test(time)) return +time
    if (time.includes(':')) {
      const tm = time.split(':')
      if (Number.isNaN(+tm[0]) || Number.isNaN(+tm[1])) return onEmpty
      return Math.min(maxDuration, +tm[1] + +tm[0] * 60)
    }

    return onEmpty
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value
    if (event.target.name === 'duration') {
      value = toSecs(value, exerciseData.duration)
    }
    setExerciseData({ ...exerciseData, [event.target.name]: value })
  }

  const onSubmit = () => {
    setInProcess(true)
    create(exerciseData)
      .then(() => {
        displayMessage('Exercise successfuly saved')
        editComplete()
      })
      .catch(() => displayMessage('Unable to save exercise!', MessageTone.ERROR))
      .finally(() => setInProcess(false))
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        title='Title'
        name='title'
        value={exerciseData.title}
        onChange={changeHandler}
        required
      />
      <div className={styles.twoInRow}>
        <Input
          title='Repeats'
          name='repeats'
          type='number'
          value={exerciseData.repeats === 0 ? '' : exerciseData.repeats}
          onChange={changeHandler}
          disabled={exerciseData.duration > 0}
        />
        <p>OR</p>
        <Input
          title='Duration'
          name='duration'
          value={formatTime(exerciseData.duration)}
          onChange={changeHandler}
          disabled={exerciseData.repeats > 0}
        />
      </div>
      <Input
        title='Calories lost'
        name='calories'
        type='number'
        value={exerciseData.calories === 0 ? '' : exerciseData.calories}
        onChange={changeHandler}
      />

      <div className={styles.controls}>
        <Button text='SAVE' disabled={inProcess} callback={onSubmit} />
        <Button text='CANCEL' disabled={inProcess} callback={editComplete} />
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    create: (exercise: Exercise) => create(exercise)(dispatch),
  }
}

export default connect(null, mapDispatchToProps)(ExerciseForm)
