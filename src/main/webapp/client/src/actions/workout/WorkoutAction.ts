import { Action, Dispatch } from 'redux'
import Workout, { WorkoutPreview } from '../../models/workout/Workout'
import { getApi, getPreviewsApi, saveTemplateApi } from '../../services/WorkoutService'
import { WorkoutActionType } from './WorkoutActionType'

export interface WorkoutAction extends Action<WorkoutActionType> {
  payload?: any
}

export const requestPreviews = () => {
  return {
    type: WorkoutActionType.PREVIEWS_REQUESTED,
  }
}

const previewsLoaded = (previews: WorkoutPreview[]) => {
  return {
    type: WorkoutActionType.PREVIEWS_LOADED,
    payload: previews,
  }
}

export const editTemplate = (id?: number) => {
  return {
    type: WorkoutActionType.EDIT_TEMPLATE,
    payload: id,
  }
}

const templateSaved = (preview: WorkoutPreview) => {
  return {
    type: WorkoutActionType.TEMPLATE_SAVED,
    payload: preview,
  }
}

export const closeEditor = () => {
  return {
    type: WorkoutActionType.CLOSE_EDITOR,
  }
}

export const requestWorkout = () => {
  return {
    type: WorkoutActionType.WORKOUT_REQUESTED,
  }
}

export const workoutLoaded = (workout: Workout) => {
  return {
    type: WorkoutActionType.WORKOUT_LOADED,
    payload: workout,
  }
}

export const getPreviews = () => (dispatch: Dispatch) => {
  dispatch(requestPreviews())
  return getPreviewsApi().then((data) => dispatch(previewsLoaded(data)))
}

export const getWorkout = (id: number) => (dispatch: Dispatch) => {
  return getApi(id).then((data) => dispatch(workoutLoaded(data)))
}

export const saveTemplate = (workout: WorkoutPreview) => (dispatch: Dispatch) =>
  saveTemplateApi(workout).then((data) => dispatch(templateSaved(data)))
