import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getPreviews as getExercisePreviews } from '../../../actions/exercise/ExerciseAction'
import { getPreviews } from '../../../actions/workout/WorkoutAction'
import Loader from '../../../components/loader/Loader'
import { ExercisePreview } from '../../../models/workout/Exercise'
import { WorkoutPreview } from '../../../models/workout/Workout'
import { StoreState } from '../../../reducers/RootReducer'
import WorkoutForm from './workout-form/WorkoutForm'
import WorkoutPreviewCard from './workout-preview-card/WorkoutPreviewCard'
import styles from './WorkoutsPage.module.scss'

const prefab: WorkoutPreview = {
  title: '',
  previews: [],
  rests: [],
  completed: false,
}

type WorkoutsPageProps = {
  exercisePreviews: ExercisePreview[]
  previews: WorkoutPreview[]
  getPreviews: () => Promise<any>
  getExercisePreviews: () => Promise<any>
}

const WorkoutsPage = ({
  exercisePreviews,
  previews,
  getPreviews,
  getExercisePreviews,
}: WorkoutsPageProps) => {
  const [loader, setLoader] = useState<string | undefined>('Preloading')
  const [template, setTemplate] = useState<WorkoutPreview | undefined>()

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    if (previews.length === 0 || exercisePreviews.length === 0) {
      setLoader('Loading Workouts')
      getPreviews().then(() => {
        if (exercisePreviews.length === 0) {
          getExercisePreviews().then(() => setLoader(undefined))
        } else setLoader(undefined)
      })
    } else setLoader(undefined)
  }, [])

  const editTemplate = (templateId: number) => {
    setTemplate(previews.find((wrk) => wrk.templateId === templateId))
  }

  if (loader) {
    return <Loader message={loader} />
  }

  return (
    <div className={`${styles.page} ${template === undefined ? styles.withOverflow : ''}`}>
      {template ? (
        <>
          <h1 className={styles.title}>{template?.templateId ? 'Edit Workout' : 'Add Workout'}</h1>
          <div className={styles.formContainer}>
            <WorkoutForm close={() => setTemplate(undefined)} edited={template} />
          </div>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Workouts</h1>
          <ul className={styles.workouts}>
            <WorkoutPreviewCard key={-1} callback={() => setTemplate(prefab)} />
            {previews
              .sort((a, b) => a.id! - b.id!)
              .map((w) => (
                <WorkoutPreviewCard
                  key={w.templateId}
                  preview={w}
                  callback={() => editTemplate(w.templateId!!)}
                />
              ))}
          </ul>
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ exercise, workout }: StoreState) => ({
  exercisePreviews: exercise.previews,
  previews: workout.previews,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPreviews: () => getPreviews()(dispatch),
    getExercisePreviews: () => getExercisePreviews()(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsPage)
