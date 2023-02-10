import Schedule from '../../../models/Schedule'
import styles from './ScheduleBlock.module.scss'

type ScheduleBlockProps = {
  schedule: Schedule
  callback?: () => void
}

const ScheduleBlock = ({ schedule, callback }: ScheduleBlockProps) => {
  const isToday = new Date(Date.now()).toDateString() === schedule.day.toDateString()
  const isBefore = Date.now() > schedule.day.getTime()

  return (
    <li
      className={`${styles.block} ${isToday ? styles.today : isBefore ? styles.before : ''}`}
      onClick={callback}
    >
      <div className={styles.date}>
        {schedule.day.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          weekday: 'short',
        })}
      </div>
    </li>
  )
}

export default ScheduleBlock
