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
import { MessageTone } from '../../../components/message-popup/MessagePopup'
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
  const [inProcess, setInProcess] = useState(false)
  const [workouts, setWorkouts] = useState<WorkoutPreview[]>([])

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    if (previews.length === 0) {
      setLoader('Loading Workouts')
      getPreviews().then(() => setLoader(undefined))
    } else setLoader(undefined)

    if (edited.previews.length > 0) {
      setWorkouts(structuredClone(edited.previews))
    }
  }, [])

  const addWorkout = (templateId: number) => {
    const copy = structuredClone(
      previews.find((prv) => prv.templateId === templateId)!
    ) as WorkoutPreview
    setWorkouts([...workouts, { ...copy, index: workouts.length }])
  }

  const removeWorkout = (index: number) => {
    const wrks = workouts.filter((wrk) => wrk.index !== index)
    wrks.forEach((w) => {
      if (w.index! > index) w.index!--
    })
    setWorkouts(wrks)
  }

  const changeExercise = (
    workout: WorkoutPreview,
    exerciseIndex: number,
    type: string,
    value: number
  ) => {
    const wrk = structuredClone(
      workouts.find((wrk) => wrk.index === workout.index)!
    ) as WorkoutPreview
    const wrks = workouts.filter((wrk) => wrk.index !== workout.index)
    wrk.previews.forEach((exr) => {
      if (exr.index === exerciseIndex) {
        if (type === 'equipment') {
          exr.equipment[0].weight = value
        } else (exr as any)[type] = value
      }
    })
    setWorkouts([...wrks, wrk])
  }

  const onSubmit = () => {
    setInProcess(true)
    setLoader('Uploading Scheduled Workout')
    const schedule = structuredClone(edited) as Schedule
    schedule.previews = workouts.map((wrk) => {
      return {
        ...wrk,
        previews: wrk.previews.map((pr) => {
          return { ...pr, preview: undefined }
        }),
      }
    })

    save(schedule)
      .then(() => {
        displayMessage('Workout successfully saved')
        close()
      })
      .catch((err) => displayMessage('Unable to save schedule!', MessageTone.ERROR))
      .finally(() => {
        setInProcess(false)
        setLoader(undefined)
      })
  }

  if (loader) {
    return <Loader message={loader} />
  }

  return (
    <DndProvider backend={getDndBackend()}>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
          {loader && <Loader message={loader} />}
          <div className={styles.container}>
            {workouts
              .sort((a, b) => a.index! - b.index!)
              .map((workout) => (
                <WorkoutBlock
                  workout={workout}
                  key={workout.index}
                  onRemove={() => removeWorkout(workout.index!!)}
                  onChangeExercise={(index, type, value) =>
                    changeExercise(workout, index, type, value)
                  }
                />
              ))}
            <DropBox text='drag workout here' type='workoutId' callback={addWorkout} large />
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
