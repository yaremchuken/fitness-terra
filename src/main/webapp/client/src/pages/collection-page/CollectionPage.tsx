import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import {
  getPreviews,
  templateClose,
  createExerciseTemplate,
  getTemplate,
} from '../../actions/exercise/ExerciseAction'
import Exercise, { ExercisePreview } from '../../models/exercise/Exercise'
import { StoreState } from '../../reducers/RootReducer'
import ExerciseForm from './exercise-form/ExerciseForm'
import styles from './CollectionPage.module.scss'
import ExercisePreviewCard from './exercise-preview-card/ExercisePreviewCard'
import Loader from '../../components/loader/Loader'

type CollectionPageProps = {
  previews: ExercisePreview[]
  template?: Exercise
  getPreviews: () => Promise<any>
  getTemplate: (id: number) => Promise<any>
  createExerciseTemplate: () => void
  templateClose: () => void
}

const CollectionPage = ({
  previews,
  template,
  getPreviews,
  getTemplate,
  createExerciseTemplate,
  templateClose,
}: CollectionPageProps) => {
  const [loader, setLoader] = useState<string | undefined>('Preloading')

  useEffect(() => {
    setLoader('Loading Exercises')
    getPreviews().then(() => setLoader(undefined))
  }, [getPreviews])

  const fetchTemplate = (id?: number) => {
    if (id) {
      setLoader('Loading Exercise')
      getTemplate(id).then(() => setLoader(undefined))
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
            <ExerciseForm close={templateClose} template={template} />
          </div>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Exercises</h1>
          <ul className={styles.exercises}>
            {previews
              .sort((a, b) => a.id! - b.id!)
              .map((e) => (
                <ExercisePreviewCard key={e.id} preview={e} callback={() => fetchTemplate(e.id)} />
              ))}
            <ExercisePreviewCard key={-1} callback={createExerciseTemplate} />
          </ul>
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ exercise }: StoreState) => ({
  previews: exercise.previews,
  template: exercise.template,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        createExerciseTemplate,
        templateClose,
      },
      dispatch
    ),
    getPreviews: () => getPreviews()(dispatch),
    getTemplate: (id: number) => getTemplate(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
