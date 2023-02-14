import { Action, Dispatch } from 'redux'
import Schedule from '../../models/Schedule'
import { getPreviewsApi, saveScheduleApi } from '../../services/ScheduleService'
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

export const editSchedule = (scheduledAt: Date, id?: number) => {
  return {
    type: ScheduleActionType.EDIT_SCHEDULE,
    payload: { scheduledAt, id },
  }
}

const scheduleSaved = (schedule: Schedule) => {
  return {
    type: ScheduleActionType.SCHEDULE_SAVED,
    payload: schedule,
  }
}

export const closeEditor = () => {
  return {
    type: ScheduleActionType.CLOSE_EDITOR,
  }
}

export const getPreviews = () => (dispatch: Dispatch) => {
  dispatch(requestPreviews())
  return getPreviewsApi().then((data) => dispatch(previewsLoaded(data)))
}

export const saveSchedule = (schedule: Schedule) => (dispatch: Dispatch) =>
  saveScheduleApi(schedule).then((data) => dispatch(scheduleSaved(data)))
