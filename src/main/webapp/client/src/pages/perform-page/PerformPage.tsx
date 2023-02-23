import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { cancelWorkoutPerform } from '../../actions/workout/WorkoutAction'
import Workout from '../../models/workout/Workout'
import { StoreState } from '../../reducers/RootReducer'
import ExercisesList from './exercises-list/ExercisesList'
import styles from './PerformPage.module.scss'

type PerformPageProps = {
  workout?: Workout
  cancelWorkoutPerform: () => void
}

const PerformPage = ({ workout, cancelWorkoutPerform }: PerformPageProps) => {
  const navigate = useNavigate()

  const [performing, setPerforming] = useState(false)

  useEffect(() => {
    if (!workout) navigate('/schedule')
  }, [workout])

  const startPerforming = () => {}

  return (
    <div className={styles.page}>
      {workout && !performing && (
        <ExercisesList
          workout={workout}
          onPerform={() => setPerforming(true)}
          onCancel={() => {
            setPerforming(false)
            cancelWorkoutPerform()
          }}
        />
      )}
    </div>
  )
}

const mapStateToProps = ({ workout }: StoreState) => ({
  workout: workout.performed,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        cancelWorkoutPerform,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformPage)
