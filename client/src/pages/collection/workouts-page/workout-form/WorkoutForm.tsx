import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { saveTemplate } from '../../../../actions/workout/WorkoutAction'
import DragBox from '../../../../components/drag-box/DragBox'
import DropBox from '../../../../components/drop-box/DropBox'
import Button from '../../../../components/form/button/Button'
import Input from '../../../../components/form/input/Input'
import Loader from '../../../../components/loader/Loader'
import { MessageTone } from '../../../../components/message-popup/MessagePopup'
import { useDisplayMessage } from '../../../../hooks/UseDisplayMessage'
import { ExercisePreview } from '../../../../models/workout/Exercise'
import { WorkoutPreview } from '../../../../models/workout/Workout'
import { StoreState } from '../../../../reducers/RootReducer'
import { getDndBackend } from '../../../../utils/Utils'
import ExercisePreviewCard from '../../exercises-page/exercise-preview-card/ExercisePreviewCard'
import ExerciseBlock from '../exercise-block/ExerciseBlock'
import styles from './WorkoutForm.module.scss'

type WorkoutFormProps = {
  previews: ExercisePreview[]
  edited: WorkoutPreview
  save: (workout: WorkoutPreview) => Promise<any>
  close: () => void
}

const WorkoutForm = ({ previews, edited, save, close }: WorkoutFormProps) => {
  const displayMessage = useDisplayMessage()

  const [loader, setLoader] = useState<string | undefined>()
  const [workoutData, setWorkoutData] = useState<WorkoutPreview>(edited)
  const [inProcess, setInProcess] = useState(false)
  const [exercises, setExercises] = useState<ExercisePreview[]>(edited.previews)
  const [rests, setRests] = useState<number[]>(edited.rests)

  const changeTitle = (title: string) => {
    setWorkoutData({ ...workoutData, title })
  }

  const addExercise = (templateId: number) => {
    const preview = previews.find((prv) => prv.templateId === templateId)!
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

    const previews: ExercisePreview[] = []
    exercises.forEach((ex) => {
      previews[ex.index!!] = {
        ...ex,
        preview: undefined,
      }
    })

    save({ ...workoutData, rests, previews })
      .then(() => {
        displayMessage('Workout successfuly saved')
        close()
      })
      .catch((err) => displayMessage('Unable to save workout!', MessageTone.ERROR))
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
          <Input
            title='Title'
            value={workoutData.title}
            onChange={(e) => changeTitle(e.currentTarget.value)}
          />
          <div className={styles.container}>
            {exercises.map((ex) => (
              <div key={ex.index} className={styles.exerciseTuple}>
                <ExerciseBlock
                  exercise={ex}
                  onRemove={() => removeExercise(ex.index!!)}
                  onChange={(type, value) => changeExercise(ex.index!!, type, value)}
                />
                {rests[ex.index!!] && (
                  <div key={ex.index!! + 100} className={styles.restBlock}>
                    <p className={styles.restTitle}>rest time</p>
                    <input
                      className={styles.restInput}
                      type='number'
                      value={rests[ex.index!!]}
                      onChange={(e) => changeRestTime(ex.index!!, +e.currentTarget.value)}
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
              key={ex.templateId}
              item={{ id: ex.templateId }}
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
    save: (workout: WorkoutPreview) => saveTemplate(workout)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutForm)
