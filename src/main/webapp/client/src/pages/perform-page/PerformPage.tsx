import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import Workout from '../../models/workout/Workout'
import { StoreState } from '../../reducers/RootReducer'
import ExercisesList from './exercises-list/ExercisesList'
import styles from './PerformPage.module.scss'

type PerformPageProps = {
  workout?: Workout
}

const PerformPage = ({ workout }: PerformPageProps) => {
  const navigate = useNavigate()

  const [loader, setLoader] = useState<string | undefined>()
  const [performing, setPerforming] = useState(false)

  useEffect(() => {
    if (!workout) navigate('/schedule')
  }, [workout])

  if (loader) {
    return <Loader message={loader} />
  }

  return (
    <div className={styles.page}>
      {workout && !performing && <ExercisesList workout={workout} />}
    </div>
  )
}

const mapStateToProps = ({ workout }: StoreState) => ({
  workout: workout.performed,
})

export default connect(mapStateToProps)(PerformPage)
