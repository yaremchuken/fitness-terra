import { Action } from 'redux'
import Schedule from '../../models/Schedule'
import { ScheduleActionType } from './ScheduleActionType'

export interface ScheduleAction extends Action<ScheduleActionType> {
  payload?: any
}

export const requestPreviews = () => {
  return {
    type: ScheduleActionType.PREVIEWS_REQUESTED,
  }
}

const previewsLoaded = (previews: Schedule[]) => {
  return {
    type: ScheduleActionType.PREVIEWS_LOADED,
    payload: previews,
  }
}

export const editSchedule = (id?: number) => {
  return {
    type: ScheduleActionType.EDIT_SCHEDULE,
    payload: id,
  }
}

export const closeEditor = () => {
  return {
    type: ScheduleActionType.CLOSE_EDITOR,
  }
}
