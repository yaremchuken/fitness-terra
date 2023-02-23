import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { cancelWorkoutPerform } from '../../actions/workout/WorkoutAction'
import Exercise from '../../models/workout/Exercise'
import Workout from '../../models/workout/Workout'
import { StoreState } from '../../reducers/RootReducer'
import ExercisePerformProcess from './exercise-perform-process/ExercisePerformProcess'
import ExercisesList from './exercises-list/ExercisesList'
import styles from './PerformPage.module.scss'

type PerformPageProps = {
  workout?: Workout
  cancelWorkoutPerform: () => void
}

const PerformPage = ({ workout, cancelWorkoutPerform }: PerformPageProps) => {
  const navigate = useNavigate()

  const [current, setCurrent] = useState<Exercise | undefined>()

  useEffect(() => {
    if (!workout) navigate('/schedule')
  }, [workout])

  return (
    <div className={styles.page}>
      {workout && !current && (
        <ExercisesList
          workout={workout}
          onPerform={() => setCurrent(workout.exercises.find((ex) => ex.index === 0)!!)}
          onCancel={() => {
            setCurrent(undefined)
            cancelWorkoutPerform()
          }}
        />
      )}
      {current && <ExercisePerformProcess exercise={current} />}
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
