import { useEffect } from 'react'
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

// TODO: Loader while waiting exercise to download its media

type CollectionPageProps = {
  previews: ExercisePreview[]
  template?: Exercise
  getPreviews: () => void
  getTemplate: (id: number) => void
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
  useEffect(() => {
    getPreviews()
  }, [getPreviews])

  const fetchTemplate = (id?: number) => {
    if (id) getTemplate(id)
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getPreviews,
      createExerciseTemplate,
      getTemplate,
      templateClose,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
