import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { closeEditor, editSchedule } from '../../actions/schedule/ScheduleAction'
import Schedule from '../../models/Schedule'
import { StoreState } from '../../reducers/RootReducer'
import ScheduleBlock from './schedule-block/ScheduleBlock'
import ScheduleForm from './schedule-form/ScheduleForm'
import styles from './SchedulePage.module.scss'

type SchedulePageProps = {
  schedules: Schedule[]
  edited?: Schedule
  editSchedule: (scheduleId?: number) => void
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
        let day = new Date(Date.now())
        day.setDate(day.getDate() + i)
        const existed = schedules.find((s) => s.day.toDateString() === day.toDateString())
        if (existed) cal.push(existed)
        else cal.push({ day, workouts: [] })
      }
      setCalendar(cal)
    }
  }, [calendar.length])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Schedule</h1>
      <ul className={styles.calendar}>
        {edited ? (
          <ScheduleForm schedule={edited} />
        ) : (
          calendar.map((schedule) => (
            <ScheduleBlock
              key={schedule.day.getTime()}
              schedule={schedule}
              callback={() => editSchedule(schedule.id)}
            />
          ))
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ scheduler }: StoreState) => ({
  schedules: scheduler.schedules,
  edited: scheduler.edited,
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
