import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { closeEditor, editSchedule, getPreviews } from '../../actions/schedule/ScheduleAction'
import { getWorkout } from '../../actions/workout/WorkoutAction'
import Loader from '../../components/loader/Loader'
import Schedule from '../../models/Schedule'
import { WorkoutPreview } from '../../models/workout/Workout'
import { StoreState } from '../../reducers/RootReducer'
import { formatDate } from '../../utils/Utils'
import ScheduleBlock from './schedule-block/ScheduleBlock'
import ScheduleForm from './schedule-form/ScheduleForm'
import styles from './SchedulePage.module.scss'

type SchedulePageProps = {
  schedules: Schedule[]
  edited?: Schedule
  getPreviews: (begin: Date, end: Date) => Promise<any>
  editSchedule: (scheduledAt: Date, scheduleId?: number) => void
  closeEditor: () => void
  getWorkout: (id: number) => Promise<any>
}

const CALENDAR_DAYS_AMOUNT = 30

const SchedulePage = ({
  schedules,
  edited,
  editSchedule,
  closeEditor,
  getPreviews,
  getWorkout,
}: SchedulePageProps) => {
  const navigate = useNavigate()

  const [calendar, setCalendar] = useState<Schedule[]>([])
  const [loader, setLoader] = useState<string | undefined>()

  /* eslint react-hooks/exhaustive-deps: 0 */
  useEffect(() => {
    if (schedules.length === 0) loadSchedules()
    else fillCalendar(schedules)
  }, [])

  const loadSchedules = () => {
    setLoader('Loading Schedules')

    const { begin, end } = getCalendarPeriod()

    getPreviews(begin, end)
      .then((data) => {
        fillCalendar(data.payload)
      })
      .finally(() => {
        setLoader(undefined)
      })
  }

  const getCalendarPeriod = () => {
    let dayToStart = -7
    while (true) {
      let checked = new Date(Date.now())
      checked.setDate(checked.getDate() + dayToStart)
      if (checked.getDay() === 1) break
      else dayToStart--
    }
    let dayToEnd = dayToStart + CALENDAR_DAYS_AMOUNT

    const begin = new Date(Date.now())
    begin.setDate(begin.getDate() + dayToStart)

    const end = new Date(Date.now())
    end.setDate(end.getDate() + dayToEnd)

    return { dayToStart, dayToEnd, begin, end }
  }

  const fillCalendar = (schedules: Schedule[]) => {
    const { dayToStart, dayToEnd } = getCalendarPeriod()
    const cal: Schedule[] = []
    for (let i = dayToStart; i <= dayToEnd; i++) {
      let scheduledAt = new Date(Date.now())
      scheduledAt.setDate(scheduledAt.getDate() + i)
      const existed = schedules.find(
        (sch) => sch.scheduledAt.toDateString() === scheduledAt.toDateString()
      )
      if (existed) cal.push(existed)
      else cal.push({ scheduledAt, previews: [] })
    }
    setCalendar(cal)
  }

  const performWorkout = (workout: WorkoutPreview) => {
    setLoader('Loading Workout')
    getWorkout(workout.id!!).then(() => {
      setLoader(undefined)
      navigate('/perform')
    })
  }

  const onEditorClose = () => {
    loadSchedules()
    closeEditor()
  }

  if (loader) {
    return <Loader message={loader} />
  }

  return (
    <div className={`${styles.page} ${edited ? '' : styles.overflowed}`}>
      <h1 className={styles.title}>
        {edited ? `Schedule on ${formatDate(edited.scheduledAt, false)}` : `Schedule`}
      </h1>
      {edited ? (
        <ScheduleForm edited={edited} close={onEditorClose} />
      ) : (
        <div className={styles.calendarHolder}>
          <ul className={styles.calendar}>
            {calendar.map((schedule) => (
              <ScheduleBlock
                key={schedule.scheduledAt.getTime()}
                schedule={schedule}
                onPerform={performWorkout}
                onEditSchedule={() => editSchedule(schedule.scheduledAt, schedule.id)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ schedule }: StoreState) => ({
  schedules: schedule.previews,
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
    getWorkout: (id: number) => getWorkout(id)(dispatch),
    getPreviews: (begin: Date, end: Date) => getPreviews(begin, end)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage)
