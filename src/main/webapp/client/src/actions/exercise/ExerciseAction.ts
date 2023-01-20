import { Action, Dispatch } from 'redux'
import Exercise from '../../models/exercise/Exercise'
import { getPreviewsApi, getTemplateApi, saveTemplateApi } from '../../services/ExerciseService'
import { ExerciseActionType } from './ExerciseActionType'

export interface ExerciseAction extends Action<ExerciseActionType> {
  payload?: any
}

export const requestExercises = () => {
  return {
    type: ExerciseActionType.PREVIEWS_REQUESTED,
  }
}

export const exercisesLoaded = (exercises: Exercise[]) => {
  return {
    type: ExerciseActionType.PREVIEWS_LOADED,
    payload: exercises,
  }
}

export const createExerciseTemplate = () => {
  return {
    type: ExerciseActionType.CREATE_TEMPLATE,
  }
}

export const exerciseLoaded = (exercise: Exercise) => {
  return {
    type: ExerciseActionType.TEMPLATE_LOADED,
    payload: exercise,
  }
}

export const exerciseCreated = (exercise: Exercise) => {
  return {
    type: ExerciseActionType.TEMPLATE_SAVED,
    payload: exercise,
  }
}

export const templateClose = () => {
  return {
    type: ExerciseActionType.TEMPLATE_CLOSE,
  }
}

export const getPreviews = () => (dispatch: Dispatch) =>
  getPreviewsApi().then((data) => dispatch(exercisesLoaded(data)))

export const getTemplate = (id: number) => (dispatch: Dispatch) =>
  getTemplateApi(id).then((data) => dispatch(exerciseLoaded(data)))

export const saveTemplate = (exercise: Exercise) => (dispatch: Dispatch) =>
  saveTemplateApi(exercise).then((data) => dispatch(exerciseCreated(data)))
