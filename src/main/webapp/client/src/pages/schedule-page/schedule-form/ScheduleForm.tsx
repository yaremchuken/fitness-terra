import Schedule from '../../../models/Schedule'
import styles from './ScheduleForm.module.scss'

type ScheduleFormProps = {
  schedule: Schedule
}

const ScheduleForm = ({ schedule }: ScheduleFormProps) => {
  return <div className={styles.form}>{schedule.day.toDateString()}</div>
}

export default ScheduleForm
