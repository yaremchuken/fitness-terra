import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getAllTemplates } from '../../actions/exercise/ExerciseAction'
import Exercise from '../../models/exercise/Exercise'
import { StoreState } from '../../reducers/RootReducer'
import ExerciseForm, { prefab } from './exercise-form/ExerciseForm'
import styles from './CollectionPage.module.scss'
import ExerciseCard from './exercise-card/ExerciseCard'

type CollectionPageProps = {
  exercises: Exercise[]
  getAllTemplates: () => void
}

const CollectionPage = ({ exercises, getAllTemplates }: CollectionPageProps) => {
  const [editable, setEditable] = useState<Exercise | undefined>()

  useEffect(() => {
    getAllTemplates()
  }, [])

  const editComplete = () => {
    setEditable(undefined)
  }

  return (
    <div className={styles.page}>
      {editable ? (
        <>
          <h1 className={styles.title}>{editable.id ? 'Edit Exercise' : 'Add Exercise'}</h1>
          <div className={styles.formContainer}>
            <ExerciseForm editComplete={editComplete} exercise={editable} />
          </div>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Exercises</h1>
          <ul className={styles.exercises}>
            {exercises
              .sort((a, b) => a.id! - b.id!)
              .map((e) => (
                <ExerciseCard key={e.id} exercise={e} callback={() => setEditable(e)} />
              ))}
            <ExerciseCard key={-1} callback={() => setEditable(prefab)} />
          </ul>
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ exercise }: StoreState) => ({
  exercises: exercise.exercises,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllTemplates,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
