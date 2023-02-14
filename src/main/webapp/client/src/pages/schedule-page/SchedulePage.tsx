import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { closeEditor, editSchedule } from '../../actions/schedule/ScheduleAction'
import Schedule from '../../models/Schedule'
import { StoreState } from '../../reducers/RootReducer'
import { formatDate } from '../../utils/Utils'
import ScheduleBlock from './schedule-block/ScheduleBlock'
import ScheduleForm from './schedule-form/ScheduleForm'
import styles from './SchedulePage.module.scss'

type SchedulePageProps = {
  schedules: Schedule[]
  edited?: Schedule
  editSchedule: (scheduledAt: Date, scheduleId?: number) => void
  closeEditor: () => void
}

const SchedulePage = ({ schedules, edited, editSchedule, closeEditor }: SchedulePageProps) => {
  const [calendar, setCalendar] = useState<Schedule[]>([])

  useEffect(() => {
    if (calendar.length === 0) {
      let toMonday = -7
      while (true) {
        let checked = new Date(Date.now())
        checked.setDate(checked.getDate() + toMonday)
        if (checked.getDay() === 1) break
        else toMonday--
      }

      const cal: Schedule[] = []
      for (let i = toMonday; i < toMonday + 31; i++) {
        let scheduledAt = new Date(Date.now())
        scheduledAt.setDate(scheduledAt.getDate() + i)
        const existed = schedules.find(
          (s) => s.scheduledAt.toDateString() === scheduledAt.toDateString()
        )
        if (existed) cal.push(existed)
        else cal.push({ scheduledAt, completed: false, workouts: [] })
      }
      setCalendar(cal)
    }
  }, [calendar.length])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {edited ? `Schedule on ${formatDate(edited.scheduledAt)}` : `Schedule`}
      </h1>
      <ul className={styles.calendar}>
        {edited ? (
          <ScheduleForm edited={edited} close={closeEditor} />
        ) : (
          calendar.map((schedule) => (
            <ScheduleBlock
              key={schedule.scheduledAt.getTime()}
              schedule={schedule}
              callback={() => editSchedule(schedule.scheduledAt, schedule.id)}
            />
          ))
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ schedule }: StoreState) => ({
  schedules: schedule.schedules,
  edited: schedule.edited,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        editSchedule,
        closeEditor,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage)
