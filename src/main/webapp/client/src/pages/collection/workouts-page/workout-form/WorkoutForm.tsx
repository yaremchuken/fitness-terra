import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { saveWorkout } from '../../../../actions/workout/WorkoutAction'
import DragBox from '../../../../components/drag-box/DragBox'
import DropBox from '../../../../components/drop-box/DropBox'
import Button from '../../../../components/form/button/Button'
import Loader from '../../../../components/loader/Loader'
import { MessageTone } from '../../../../components/message-popup/MessagePopup'
import { useDisplayMessage } from '../../../../hooks/UseDisplayMessage'
import { ExercisePreview } from '../../../../models/workout/Exercise'
import Workout from '../../../../models/workout/Workout'
import { StoreState } from '../../../../reducers/RootReducer'
import { getDndBackend } from '../../../../utils/Utils'
import ExercisePreviewCard from '../../exercises-page/exercise-preview-card/ExercisePreviewCard'
import ExerciseBlock, { IndexedExercise } from '../exercise-block/ExerciseBlock'
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
  const [exercises, setExercises] = useState<IndexedExercise[]>([])
  const [rests, setRests] = useState<number[]>([])

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

  const addExercise = (id: number) => {
    const preview = previews.find((prv) => prv.id === id)!
    const copy = JSON.parse(JSON.stringify(preview))
    if (exercises.length > 0) {
      setRests([...rests, 10])
    }
    setExercises([...exercises, { ...copy, preview: preview.preview, index: exercises.length }])
  }

  const changeExercise = (index: number, type: string, value: number) => {
    let changed = exercises[index]

    if (type === 'equipment') {
      changed.equipment[0].weight = value
    } else (changed as any)[type] = value

    const updated = [...exercises]
    updated[index] = changed
    setExercises(updated)
  }

  const removeExercise = (index: number) => {
    if (index === rests.length) {
      setRests(rests.slice(0, rests.length - 1))
    } else setRests(rests.filter((_, idx) => idx !== index))
    setExercises([...exercises.slice(0, index), ...exercises.slice(index, exercises.length - 1)])
  }

  const changeRestTime = (index: number, amount: number) => {
    const updated = [...rests]
    updated[index] = amount
    setRests(updated)
  }

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
    <DndProvider backend={getDndBackend()}>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
          {loader && <Loader message={loader} />}
          <div className={styles.container}>
            {exercises.map((ex) => (
              <div key={ex.index} className={styles.exerciseTuple}>
                <ExerciseBlock
                  exercise={ex}
                  onRemove={() => removeExercise(ex.index)}
                  onChange={(type, value) => changeExercise(ex.index, type, value)}
                />
                {rests[ex.index] && (
                  <div key={ex.index + 100} className={styles.restBlock}>
                    <p className={styles.restTitle}>rest time</p>
                    <input
                      className={styles.restInput}
                      type='number'
                      value={rests[ex.index]}
                      onChange={(e) => changeRestTime(ex.index, +e.currentTarget.value)}
                    />
                  </div>
                )}
              </div>
            ))}
            <DropBox text='drag exercise here' type='exerciseId' callback={addExercise} />
          </div>
          <div className={styles.controls}>
            <Button text='SAVE' disabled={inProcess} callback={onSubmit} />
            <Button text='CANCEL' disabled={inProcess} callback={close} />
          </div>
        </form>
        <ul className={styles.exercises}>
          {previews.map((ex) => (
            <DragBox
              key={ex.id}
              item={{ id: ex.id }}
              children={<ExercisePreviewCard preview={ex} />}
              type='exerciseId'
            />
          ))}
        </ul>
      </div>
    </DndProvider>
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
