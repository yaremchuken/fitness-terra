import { ScheduleAction } from '../actions/schedule/ScheduleAction'
import { ScheduleActionType } from '../actions/schedule/ScheduleActionType'
import Schedule from '../models/Schedule'

const prefab = (scheduledAt: Date): Schedule => {
  return {
    scheduledAt,
    previews: [],
  }
}

export type State = {
  previews: Schedule[]
  edited?: Schedule
}

const initialState = {
  previews: [],
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
      const { scheduledAt, id } = action.payload
      return {
        ...state,
        edited: id ? state.previews.find((s) => s.id === id) : { ...prefab(scheduledAt) },
      }

    case ScheduleActionType.CLOSE_EDITOR:
      return {
        ...state,
        edited: undefined,
      }

    case ScheduleActionType.SCHEDULE_SAVED:
      const schedule = action.payload
      return {
        ...state,
        previews: [...state.previews.filter((sch) => sch.id !== schedule.id), schedule],
      }

    default:
      return state
  }
}

export default reducer
