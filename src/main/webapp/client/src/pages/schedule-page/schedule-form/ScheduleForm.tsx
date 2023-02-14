import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { saveSchedule } from '../../../actions/schedule/ScheduleAction'
import { getPreviews } from '../../../actions/workout/WorkoutAction'
import DragBox from '../../../components/drag-box/DragBox'
import DropBox from '../../../components/drop-box/DropBox'
import Button from '../../../components/form/button/Button'
import Loader from '../../../components/loader/Loader'
import { useDisplayMessage } from '../../../hooks/UseDisplayMessage'
import Schedule from '../../../models/Schedule'
import { WorkoutPreview } from '../../../models/workout/Workout'
import { StoreState } from '../../../reducers/RootReducer'
import { getDndBackend } from '../../../utils/Utils'
import WorkoutPreviewCard from '../../collection/workouts-page/workout-preview-card/WorkoutPreviewCard'
import WorkoutBlock from '../workout-block/WorkoutBlock'
import styles from './ScheduleForm.module.scss'

type ScheduleFormProps = {
  previews: WorkoutPreview[]
  edited: Schedule
  getPreviews: () => Promise<any>
  save: (schedule: Schedule) => Promise<any>
  close: () => void
}

const ScheduleForm = ({ previews, getPreviews, edited, save, close }: ScheduleFormProps) => {
  const displayMessage = useDisplayMessage()

  const [loader, setLoader] = useState<string | undefined>('Preloading')
  const [scheduleData, setScheduleData] = useState<Schedule>(edited)
  const [inProcess, setInProcess] = useState(false)
  const [workouts, setWorkouts] = useState<WorkoutPreview[]>([])

  useEffect(() => {
    if (previews.length === 0) {
      setLoader('Loading Workouts')
      getPreviews().then(() => setLoader(undefined))
    } else setLoader(undefined)
  }, [])

  const addWorkout = (templateId: number) => {
    console.log('ADD WORKOUT')

    // const preview = previews.find((prv) => prv.templateId === templateId)!
    // const copy = JSON.parse(JSON.stringify(preview))
    // setWorkouts([...workouts, { ...copy, preview: preview.preview, index: exercises.length }])
  }

  // const changeExercise = (index: number, type: string, value: number) => {
  //   let changed = exercises[index]

  //   if (type === 'equipment') {
  //     changed.equipment[0].weight = value
  //   } else (changed as any)[type] = value

  //   const updated = [...exercises]
  //   updated[index] = changed
  //   setExercises(updated)
  // }

  // const removeExercise = (index: number) => {
  //   if (index === rests.length) {
  //     setRests(rests.slice(0, rests.length - 1))
  //   } else setRests(rests.filter((_, idx) => idx !== index))
  //   setExercises([...exercises.slice(0, index), ...exercises.slice(index, exercises.length - 1)])
  // }

  // const changeRestTime = (index: number, amount: number) => {
  //   const updated = [...rests]
  //   updated[index] = amount
  //   setRests(updated)
  // }

  const onSubmit = () => {
    console.log('SUBMIT')
  }

  const removeWorkout = (index: number) => {
    console.log('REMOVE')
  }

  const changeExercise = (
    workout: WorkoutPreview,
    exerciseIndex: number,
    type: string,
    value: number
  ) => {
    console.log('CHANGE EXERCISE')
  }

  // const onSubmit = () => {
  //   setInProcess(true)
  //   setLoader('Uploading Workout Data')

  //   const previews: IndexedExercise[] = []
  //   exercises.forEach((ex) => {
  //     previews[ex.index] = {
  //       ...ex,
  //       preview: undefined,
  //     }
  //   })

  //   save({ ...workoutData, rests, previews })
  //     .then(() => {
  //       displayMessage('Workout successfuly saved')
  //       close()
  //     })
  //     .catch((err) => displayMessage('Unable to save workout!', MessageTone.ERROR))
  //     .finally(() => {
  //       setInProcess(false)
  //       setLoader(undefined)
  //     })
  // }

  if (loader) {
    return <Loader message={loader} />
  }

  return (
    <DndProvider backend={getDndBackend()}>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
          {loader && <Loader message={loader} />}
          <div className={styles.container}>
            {workouts.map((workout) => (
              <WorkoutBlock
                workout={workout}
                onRemove={() => removeWorkout(workout.index!!)}
                onChangeExercise={(index, type, value) =>
                  changeExercise(workout, index, type, value)
                }
              />
            ))}
            <DropBox text='drag workout here' type='workoutId' callback={addWorkout} />
          </div>
          <div className={styles.controls}>
            <Button text='SAVE' disabled={inProcess} callback={onSubmit} />
            <Button text='CANCEL' disabled={inProcess} callback={close} />
          </div>
        </form>
        <h2>Workouts</h2>
        <ul className={styles.workouts}>
          {previews.map((prv) => (
            <DragBox
              key={prv.templateId}
              item={{ id: prv.templateId }}
              children={<WorkoutPreviewCard key={prv.templateId} preview={prv} />}
              type='workoutId'
            />
          ))}
        </ul>
      </div>
    </DndProvider>
  )
}

const mapStateToProps = ({ workout }: StoreState) => ({
  previews: workout.previews,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPreviews: () => getPreviews()(dispatch),
    save: (schedule: Schedule) => saveSchedule(schedule)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm)
