import ImgButton, { Position, Size } from '../../../components/img-button/ImgButton'
import Schedule from '../../../models/Schedule'
import { WorkoutPreview } from '../../../models/workout/Workout'
import { formatDate } from '../../../utils/Utils'
import styles from './ScheduleBlock.module.scss'

type ScheduleBlockProps = {
  schedule: Schedule
  onPerform: (workout: WorkoutPreview) => void
  onEditSchedule: () => void
}

const ScheduleBlock = ({ schedule, onPerform, onEditSchedule }: ScheduleBlockProps) => {
  const isToday = new Date(Date.now()).toDateString() === schedule.scheduledAt.toDateString()
  const isBefore = !isToday && Date.now() > schedule.scheduledAt.getTime()
  const isEmpty = !schedule.id

  const clickHandler = () => {
    if (!clickable()) return
    if (!isBefore && !isToday) onEditSchedule()
    if (isToday && isEmpty) onEditSchedule()
  }

  const clickable = () => {
    if (isBefore && isEmpty) return false
    if (isToday && !isEmpty) return false
    return true
  }

  const workoutClickHandler = (workout: WorkoutPreview) => {
    if (isToday && !workout.completed) onPerform(workout)
  }

  return (
    <li
      className={`${styles.block} ${clickable() ? styles.clickable : ''} ${
        isToday ? styles.today : isBefore ? styles.before : ''
      }`}
      onClick={clickHandler}
    >
      <p className={styles.heading}>{formatDate(schedule.scheduledAt)}</p>
      {isToday && !isEmpty && (
        <ImgButton
          callback={onEditSchedule}
          type='edit'
          size={Size.X_SMALL}
          position={Position.LEFT_TOP_NP}
        />
      )}
      {!isEmpty && (
        <div className={styles.workouts}>
          {schedule.previews
            .sort((a, b) => a.index!! - b.index!!)
            .map((wrk) => (
              <div
                key={wrk.index}
                className={`
                  ${styles.workout}
                  ${isToday ? styles.performable : ''}
                  ${wrk.completed ? styles.completed : ''}
                  ${!wrk.completed && isBefore ? styles.skipped : ''}`.trim()}
                onClick={() => workoutClickHandler(wrk)}
              >
                {wrk.title}
              </div>
            ))}
        </div>
      )}
    </li>
  )
}

export default ScheduleBlock
