import { Action, Dispatch } from 'redux'
import Workout, { WorkoutPreview } from '../../models/workout/Workout'
import { getPreviewsApi, getWorkoutApi, saveWorkoutApi } from '../../services/WorkoutService'
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

export const editWorkout = (id?: number) => {
  return {
    type: WorkoutActionType.EDIT_WORKOUT,
    payload: id,
  }
}

const workoutLoaded = (workout: Workout) => {
  return {
    type: WorkoutActionType.WORKOUT_LOADED,
    payload: workout,
  }
}

const workoutSaved = (preview: WorkoutPreview) => {
  return {
    type: WorkoutActionType.WORKOUT_SAVED,
    payload: preview,
  }
}

export const closeEditor = () => {
  return {
    type: WorkoutActionType.CLOSE_EDITOR,
  }
}

export const getPreviews = () => (dispatch: Dispatch) => {
  dispatch(requestPreviews())
  return getPreviewsApi().then((data) => dispatch(previewsLoaded(data)))
}

export const getWorkout = (id: number) => (dispatch: Dispatch) =>
  getWorkoutApi(id).then((data) => dispatch(workoutLoaded(data)))

export const saveWorkout = (workout: WorkoutPreview) => (dispatch: Dispatch) =>
  saveWorkoutApi(workout).then((data) => dispatch(workoutSaved(data)))
