import { Action, Dispatch } from 'redux'
import { WorkoutPreview } from '../../models/workout/Workout'
import { completeApi, getApi, getPreviewsApi, saveTemplateApi } from '../../services/WorkoutService'
import { WorkoutActionType } from './WorkoutActionType'

export interface WorkoutAction extends Action<WorkoutActionType> {
  payload?: any
}

export const requestPreviews = () => {
  return {
    type: WorkoutActionType.PREVIEWS_REQUESTED,
  }
}

export const requestWorkout = () => {
  return {
    type: WorkoutActionType.WORKOUT_REQUESTED,
  }
}

export const closeWorkoutPerform = () => {
  return {
    type: WorkoutActionType.WORKOUT_PERFORM_CLOSED,
  }
}

export const getPreviews = () => (dispatch: Dispatch) => {
  dispatch(requestPreviews())
  return getPreviewsApi().then((data) =>
    dispatch({
      type: WorkoutActionType.PREVIEWS_LOADED,
      payload: data,
    })
  )
}

export const saveTemplate = (workout: WorkoutPreview) => (dispatch: Dispatch) =>
  saveTemplateApi(workout).then((data) =>
    dispatch({
      type: WorkoutActionType.TEMPLATE_SAVED,
      payload: data,
    })
  )

export const getWorkout = (id: number) => (dispatch: Dispatch) => {
  return getApi(id).then((data) =>
    dispatch({
      type: WorkoutActionType.WORKOUT_LOADED,
      payload: data,
    })
  )
}

export const completeWorkout = (id: number) => (dispatch: Dispatch) => {
  return completeApi(id).then((data) =>
    dispatch({
      type: WorkoutActionType.WORKOUT_COMPLETED,
      payload: data,
    })
  )
}
