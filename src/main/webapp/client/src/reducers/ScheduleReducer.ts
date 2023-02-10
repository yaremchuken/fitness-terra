import { ScheduleAction } from '../actions/schedule/ScheduleAction'
import { ScheduleActionType } from '../actions/schedule/ScheduleActionType'
import Schedule from '../models/Schedule'

const prefab = () => {
  return {
    day: new Date(Date.now()),
    workouts: [],
  }
}

export type State = {
  schedules: Schedule[]
  edited?: Schedule
}

const initialState = {
  schedules: [],
}

const reducer = (state: State = initialState, action: ScheduleAction) => {
  switch (action.type) {
    case ScheduleActionType.CLEAR_STORES:
      return { ...initialState }

    case ScheduleActionType.PREVIEWS_REQUESTED:
      return {
        ...state,
        previews: [],
      }

    case ScheduleActionType.PREVIEWS_LOADED:
      return {
        ...state,
        previews: action.payload,
      }

    case ScheduleActionType.EDIT_SCHEDULE:
      const scheduleId: number | undefined = action.payload
      return {
        ...state,
        edited: scheduleId ? state.schedules.find((s) => s.id === scheduleId) : { ...prefab() },
      }

    case ScheduleActionType.CLOSE_EDITOR:
      return {
        ...state,
        edited: undefined,
      }

    default:
      return state
  }
}

export default reducer
