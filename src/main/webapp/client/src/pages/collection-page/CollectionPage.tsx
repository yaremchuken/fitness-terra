import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { getAll } from '../../actions/exercise/ExerciseAction'
import Exercise from '../../models/exercise/Exercise'
import { StoreState } from '../../reducers/RootReducer'
import ExerciseForm from './exercise-form/ExerciseForm'
import styles from './CollectionPage.module.scss'
import ExerciseCard from './exercise-card/ExerciseCard'

type CollectionPageProps = {
  exercises: Exercise[]
  getAll: () => void
}

const CollectionPage = ({ exercises, getAll }: CollectionPageProps) => {
  const [editMode, setEditMode] = useState<Exercise | undefined>()

  useEffect(() => {
    getAll()
  }, [])

  const editComplete = () => {
    setEditMode(undefined)
  }

  return (
    <div className={styles.page}>
      {editMode ? (
        <>
          <h1 className={styles.title}>Add new Exercise</h1>
          <ExerciseForm editComplete={editComplete} />
        </>
      ) : (
        <>
          <h1 className={styles.title}>Exercises Collection</h1>
          <ul className={styles.exercises}>
            {exercises.map((e) => (
              <ExerciseCard key={e.id} exercise={e} callback={() => setEditMode(e)} />
            ))}
            <ExerciseCard key={-1} callback={() => setEditMode({} as Exercise)} />
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
      getAll,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
