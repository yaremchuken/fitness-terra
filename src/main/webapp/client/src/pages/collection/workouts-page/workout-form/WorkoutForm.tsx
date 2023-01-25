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
import Exercise, { ExercisePreview } from '../../../../models/workout/Exercise'
import Workout from '../../../../models/workout/Workout'
import { StoreState } from '../../../../reducers/RootReducer'
import { getDndBackend } from '../../../../utils/Utils'
import ExercisePreviewCard from '../../exercises-page/exercise-preview-card/ExercisePreviewCard'
import ExerciseBlock, { ExerciseInfo } from '../exercise-block/ExerciseBlock'
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
  const [exercises, setExercises] = useState<ExerciseInfo[]>([])

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
    setExercises([...exercises, { templateId: preview.id!, order: exercises.length }])
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
              <ExerciseBlock key={ex.order} info={ex} />
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
