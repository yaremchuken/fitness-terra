import { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { create, getAll } from '../../actions/exercise/ExerciseAction'
import Exercise from '../../models/exercise/Exercise'
import { StoreState } from '../../reducers/RootReducer'

type LibraryPageProps = {
  exercises: Exercise[]
  getAll: () => void
  create: (exercise: Exercise) => void
}

type LibraryPageState = {}

const LibraryPage = ({ exercises, getAll, create }: LibraryPageProps) => {
  useEffect(() => {
    getAll()
  }, [])

  return (
    <div>
      LIBRARY <div>{exercises.map((e) => e.title)}</div>
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
      create,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage)
