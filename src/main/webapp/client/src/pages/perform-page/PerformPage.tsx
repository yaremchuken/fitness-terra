import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import Workout from '../../models/workout/Workout'
import { StoreState } from '../../reducers/RootReducer'
import styles from './PerformPage.module.scss'

type PerformPageProps = {
  performed?: Workout
}

const PerformPage = ({ performed }: PerformPageProps) => {
  const navigate = useNavigate()

  const [loader, setLoader] = useState<string | undefined>()

  useEffect(() => {
    if (!performed) navigate('/schedule')
  }, [performed])

  if (loader) {
    return <Loader message={loader} />
  }

  return <div className={styles.page}>PERFORM {performed?.title}</div>
}

const mapStateToProps = ({ workout }: StoreState) => ({
  performed: workout.performed,
})

export default connect(mapStateToProps)(PerformPage)
