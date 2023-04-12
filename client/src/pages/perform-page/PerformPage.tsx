import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { markScheduledWorkoutCompleted } from '../../actions/schedule/ScheduleAction'
import { closeWorkoutPerform, completeWorkout } from '../../actions/workout/WorkoutAction'
import Button from '../../components/form/button/Button'
import Exercise from '../../models/workout/Exercise'
import Workout from '../../models/workout/Workout'
import { StoreState } from '../../reducers/RootReducer'
import ExercisePerformProcess, {
  BreakInfo,
} from './exercise-perform-process/ExercisePerformProcess'
import ExercisesList from './exercises-list/ExercisesList'
import styles from './PerformPage.module.scss'

type PerformPageProps = {
  workout?: Workout
  closeWorkoutPerform: () => void
  completeWorkout: (id: number) => Promise<any>
  markScheduledWorkoutCompleted: (workoutId: number) => void
}

const PerformPage = ({
  workout,
  closeWorkoutPerform,
  completeWorkout,
  markScheduledWorkoutCompleted,
}: PerformPageProps) => {
  const navigate = useNavigate()

  const [queue, setQueue] = useState<(Exercise | BreakInfo)[]>([])
  const [pointer, setPointer] = useState(-1)
  const [completed, setCompleted] = useState(false)

  const isExercise = () => (queue[pointer] as any).id !== undefined

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    if (!workout) navigate('/schedule')
    else {
      const que: (Exercise | BreakInfo)[] = []
      let idx = 0
      while (true) {
        que.push(workout.exercises[idx])
        if (idx < workout.rests.length)
          que.push({ duration: workout.rests[idx], next: workout.exercises[idx + 1] })
        if (idx === workout.exercises.length - 1) break
        idx++
      }
      setQueue(que)
    }
  }, [workout])

  const onComplete = () => {
    if (pointer === queue.length - 1) {
      if (workout?.id) {
        completeWorkout(workout.id).then(() => markScheduledWorkoutCompleted(workout.id!))
      }
      setCompleted(true)
    } else setPointer(pointer + 1)
  }

  return (
    <div className={styles.page}>
      {workout && pointer === -1 && (
        <ExercisesList
          workout={workout}
          onPerform={() => setPointer(0)}
          onCancel={() => {
            setPointer(-1)
            closeWorkoutPerform()
          }}
        />
      )}
      {!completed && pointer > -1 && (
        <ExercisePerformProcess
          exercise={isExercise() ? (queue[pointer] as Exercise) : undefined}
          breakInfo={!isExercise() ? (queue[pointer] as BreakInfo) : undefined}
          onComplete={onComplete}
        />
      )}
      {completed && <Button text='CLOSE' callback={closeWorkoutPerform} big />}
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
        closeWorkoutPerform,
        markScheduledWorkoutCompleted,
      },
      dispatch
    ),
    completeWorkout: (id: number) => completeWorkout(id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerformPage)
