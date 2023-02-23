import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { getPreviews, getTemplate } from '../../../actions/exercise/ExerciseAction'
import Loader from '../../../components/loader/Loader'
import { ActivityType } from '../../../models/workout/ActivityType'
import Exercise, { ExercisePreview } from '../../../models/workout/Exercise'
import { StoreState } from '../../../reducers/RootReducer'
import ExerciseForm from './exercise-form/ExerciseForm'
import ExercisePreviewCard from './exercise-preview-card/ExercisePreviewCard'
import styles from './ExercisesPage.module.scss'

export const prefab: Exercise = {
  title: '',
  type: ActivityType.WARMUP,
  muscleGroups: [],
  description: '',
  repeats: 0,
  duration: 0,
  calories: 0,
  equipment: [],
}

type ExercisesPageProps = {
  previews: ExercisePreview[]
  getPreviews: () => Promise<any>
  getTemplate: (id: number) => Promise<any>
}

const ExercisesPage = ({ previews, getPreviews, getTemplate }: ExercisesPageProps) => {
  const [loader, setLoader] = useState<string | undefined>('Preloading')
  const [template, setTemplate] = useState<Exercise | undefined>()

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    if (previews.length === 0) {
      setLoader('Loading Exercises')
      getPreviews().then(() => setLoader(undefined))
    } else setLoader(undefined)
  }, [])

  const fetchTemplate = (id?: number) => {
    if (id) {
      setLoader('Loading Exercise')
      getTemplate(id).then((data) => {
        setTemplate(data)
        setLoader(undefined)
      })
    }
  }

  if (loader) {
    return <Loader message={loader} />
  }

  return (
    <div className={styles.page}>
      {template ? (
        <>
          <h1 className={styles.title}>{template.id ? 'Edit Exercise' : 'Add Exercise'}</h1>
          <div className={styles.formContainer}>
            <ExerciseForm close={() => setTemplate(undefined)} template={template} />
          </div>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Exercises</h1>
          <ul className={styles.exercises}>
            <ExercisePreviewCard key={-1} callback={() => setTemplate(structuredClone(prefab))} />
            {previews
              .sort((a, b) => a.templateId! - b.templateId!)
              .map((e) => (
                <ExercisePreviewCard
                  key={e.templateId}
                  preview={e}
                  callback={() => fetchTemplate(e.templateId)}
                />
              ))}
          </ul>
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ exercise }: StoreState) => ({
  previews: exercise.previews,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPreviews: () => getPreviews()(dispatch),
    getTemplate: (id: number) => getTemplate(id),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesPage)
