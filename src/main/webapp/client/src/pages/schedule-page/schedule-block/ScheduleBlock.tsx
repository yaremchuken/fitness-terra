import Schedule from '../../../models/Schedule'
import { formatDate } from '../../../utils/Utils'
import styles from './ScheduleBlock.module.scss'

type ScheduleBlockProps = {
  schedule: Schedule
  callback?: () => void
}

const ScheduleBlock = ({ schedule, callback }: ScheduleBlockProps) => {
  const isToday = new Date(Date.now()).toDateString() === schedule.scheduledAt.toDateString()
  const isBefore = Date.now() > schedule.scheduledAt.getTime()

  return (
    <li
      className={`${styles.block} ${isToday ? styles.today : isBefore ? styles.before : ''}`}
      onClick={callback}
    >
      <div className={styles.date}>{formatDate(schedule.scheduledAt)}</div>
    </li>
  )
}

export default ScheduleBlock
