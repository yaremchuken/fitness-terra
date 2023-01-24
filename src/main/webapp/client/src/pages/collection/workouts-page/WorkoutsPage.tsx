import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreState } from '../../../reducers/RootReducer'
import styles from './WorkoutsPage.module.scss'
import Loader from '../../../components/loader/Loader'
import Workout, { WorkoutPreview } from '../../../models/workout/Workout'
import WorkoutPreviewCard from './workout-preview-card/WorkoutPreviewCard'
import WorkoutForm from './workout-form/WorkoutForm'
import {
  createWorkout,
  getPreviews,
  getWorkout,
  workoutClose,
} from '../../../actions/workout/WorkoutAction'
import { getPreviews as getExercisePreviews } from '../../../actions/exercise/ExerciseAction'
import { ExercisePreview } from '../../../models/workout/Exercise'

type WorkoutsPageProps = {
  exercisePreviews: ExercisePreview[]
  previews: WorkoutPreview[]
  workout?: Workout
  getPreviews: () => Promise<any>
  getExercisePreviews: () => Promise<any>
  getWorkout: (id: number) => Promise<any>
  createWorkout: () => void
  workoutClose: () => void
}

const WorkoutsPage = ({
  exercisePreviews,
  previews,
  workout,
  getPreviews,
  getExercisePreviews,
  getWorkout,
  createWorkout,
  workoutClose,
}: WorkoutsPageProps) => {
  const [loader, setLoader] = useState<string | undefined>('Preloading')

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    if (workout) {
      workoutClose()
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
      {workout ? (
        <>
          <h1 className={styles.title}>{workout.id ? 'Edit Workout' : 'Add Workout'}</h1>
          <div className={styles.formContainer}>
            <WorkoutForm close={workoutClose} workout={workout} />
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
            <WorkoutPreviewCard key={-1} callback={createWorkout} />
          </ul>
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ exercise, workout }: StoreState) => ({
  exercisePreviews: exercise.previews,
  previews: workout.previews,
  workout: workout.workout,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        createWorkout,
        workoutClose,
      },
      dispatch
    ),
    getPreviews: () => getPreviews()(dispatch),
    getExercisePreviews: () => getExercisePreviews()(dispatch),
    getWorkout: (id: number) => getWorkout(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsPage)
