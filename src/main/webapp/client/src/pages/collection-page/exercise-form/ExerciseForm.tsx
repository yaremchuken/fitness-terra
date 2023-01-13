import { ChangeEvent, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { create } from '../../../actions/exercise/ExerciseAction'
import { MessageTone } from '../../../components/message-popup/MessagePopup'
import { useDisplayMessage } from '../../../hooks/UseDisplayMessage'
import Exercise from '../../../models/exercise/Exercise'
import { ExerciseType } from '../../../models/exercise/ExerciseType'
import { MuscleGroup } from '../../../models/exercise/MuscleGroup'
import styles from './ExerciseForm.module.scss'

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
  const [inProcess, setinProcess] = useState(false)

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setExerciseData({ ...exerciseData, [event.target.name]: event.target.value })
  }

  const onSubmit = () => {
    setinProcess(true)
    create(exerciseData)
      .then(() => {
        displayMessage('Exercise successfuly saved')
        editComplete()
      })
      .catch(() => displayMessage('Unable to save exercise!', MessageTone.ERROR))
      .finally(() => setinProcess(false))
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        placeholder='Title'
        type='text'
        name='title'
        value={exerciseData.title}
        onChange={changeHandler}
        required
      />
      <input
        className={styles.input}
        placeholder='Repeats'
        type='number'
        name='repeats'
        value={exerciseData.repeats === 0 ? '' : exerciseData.repeats}
        onChange={changeHandler}
        required
      />
      <input
        className={styles.input}
        placeholder='Duration'
        type='number'
        name='duration'
        value={exerciseData.duration === 0 ? '' : exerciseData.duration}
        onChange={changeHandler}
        required
      />
      <input
        className={styles.input}
        placeholder='Calories'
        type='number'
        name='calories'
        value={exerciseData.calories === 0 ? '' : exerciseData.calories}
        onChange={changeHandler}
        required
      />

      <div className={styles.controls}>
        <button
          className={`${styles.btn} ${inProcess ? styles.disabled : ''}`}
          type='button'
          onClick={onSubmit}
          disabled={inProcess}
        >
          SAVE
        </button>

        <button
          className={`${styles.btn} ${inProcess ? styles.disabled : ''}`}
          type='button'
          onClick={editComplete}
          disabled={inProcess}
        >
          CANCEL
        </button>
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
