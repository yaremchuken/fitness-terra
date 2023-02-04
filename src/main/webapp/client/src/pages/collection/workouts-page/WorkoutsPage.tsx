import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getPreviews as getExercisePreviews } from '../../../actions/exercise/ExerciseAction'
import {
  closeEditor,
  editWorkout,
  getPreviews,
  getWorkout,
} from '../../../actions/workout/WorkoutAction'
import Loader from '../../../components/loader/Loader'
import { ExercisePreview } from '../../../models/workout/Exercise'
import { WorkoutPreview } from '../../../models/workout/Workout'
import { StoreState } from '../../../reducers/RootReducer'
import WorkoutForm from './workout-form/WorkoutForm'
import WorkoutPreviewCard from './workout-preview-card/WorkoutPreviewCard'
import styles from './WorkoutsPage.module.scss'

type WorkoutsPageProps = {
  exercisePreviews: ExercisePreview[]
  previews: WorkoutPreview[]
  edited?: WorkoutPreview
  getPreviews: () => Promise<any>
  getExercisePreviews: () => Promise<any>
  getWorkout: (id: number) => Promise<any>
  editWorkout: () => void
  closeEditor: () => void
}

const WorkoutsPage = ({
  exercisePreviews,
  previews,
  edited,
  getPreviews,
  getExercisePreviews,
  getWorkout,
  editWorkout,
  closeEditor,
}: WorkoutsPageProps) => {
  const [loader, setLoader] = useState<string | undefined>('Preloading')

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    if (edited) {
      closeEditor()
    }
    if (previews.length === 0) {
      setLoader('Loading Workouts')
      getPreviews().then(() => {
        if (exercisePreviews.length === 0) getExercisePreviews().then(() => setLoader(undefined))
        else setLoader(undefined)
      })
    } else setLoader(undefined)
  }, [])

  const fetchWorkout = (id?: number) => {
    if (id) {
      setLoader('Loading Workout')
      getWorkout(id).then(() => setLoader(undefined))
    }
  }

  if (loader) {
    return <Loader message={loader} />
  }

  return (
    <div className={styles.page}>
      {edited ? (
        <>
          <h1 className={styles.title}>{edited.id ? 'Edit Workout' : 'Add Workout'}</h1>
          <div className={styles.formContainer}>
            <WorkoutForm close={closeEditor} edited={edited} />
          </div>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Workouts</h1>
          <ul className={styles.workouts}>
            {previews
              .sort((a, b) => a.id! - b.id!)
              .map((e) => (
                <WorkoutPreviewCard key={e.id} preview={e} callback={() => fetchWorkout(e.id)} />
              ))}
            <WorkoutPreviewCard key={-1} callback={editWorkout} />
          </ul>
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ exercise, workout }: StoreState) => ({
  exercisePreviews: exercise.previews,
  previews: workout.previews,
  edited: workout.edited,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        editWorkout,
        closeEditor,
      },
      dispatch
    ),
    getPreviews: () => getPreviews()(dispatch),
    getExercisePreviews: () => getExercisePreviews()(dispatch),
    getWorkout: (id: number) => getWorkout(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsPage)
