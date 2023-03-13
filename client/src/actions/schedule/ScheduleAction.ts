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

export const editSchedule = (scheduledAt: Date, id?: number) => {
  return {
    type: ScheduleActionType.EDIT_SCHEDULE,
    payload: { scheduledAt, id },
  }
}

export const closeEditor = () => {
  return {
    type: ScheduleActionType.CLOSE_EDITOR,
  }
}

export const markScheduledWorkoutCompleted = (workoutId: number) => {
  return {
    type: ScheduleActionType.MARK_SCHEDULED_WORKOUT_COMPLETED,
    payload: workoutId,
  }
}

export const getPreviews = (begin: Date, end: Date) => (dispatch: Dispatch) => {
  dispatch(requestPreviews())
  return getPreviewsApi(begin, end).then((data) =>
    dispatch({
      type: ScheduleActionType.PREVIEWS_LOADED,
      payload: data,
    })
  )
}

export const saveSchedule = (schedule: Schedule) => (dispatch: Dispatch) =>
  saveScheduleApi(schedule).then((data) =>
    dispatch({
      type: ScheduleActionType.SCHEDULE_SAVED,
      payload: data,
    })
  )
