import { Action, Dispatch } from 'redux'
import Exercise, { ExercisePreview } from '../../models/workout/Exercise'
import { getPreviewsApi, getTemplateApi, saveTemplateApi } from '../../services/ExerciseService'
import { ExerciseActionType } from './ExerciseActionType'

export interface ExerciseAction extends Action<ExerciseActionType> {
  payload?: any
}

export const requestPreviews = () => {
  return {
    type: ExerciseActionType.PREVIEWS_REQUESTED,
  }
}

const previewsLoaded = (exercises: ExercisePreview[]) => {
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

const templateLoaded = (exercise: Exercise) => {
  return {
    type: ExerciseActionType.TEMPLATE_LOADED,
    payload: exercise,
  }
}

const templateSaved = (preview: ExercisePreview) => {
  return {
    type: ExerciseActionType.TEMPLATE_SAVED,
    payload: preview,
  }
}

export const templateClose = () => {
  return {
    type: ExerciseActionType.TEMPLATE_CLOSE,
  }
}

export const getPreviews = () => (dispatch: Dispatch) => {
  dispatch(requestPreviews())
  return getPreviewsApi().then((data) => dispatch(previewsLoaded(data)))
}

export const getTemplate = (id: number) => (dispatch: Dispatch) =>
  getTemplateApi(id).then((data) => dispatch(templateLoaded(data)))

export const saveTemplate = (exercise: Exercise) => (dispatch: Dispatch) =>
  saveTemplateApi(exercise).then((data) => dispatch(templateSaved(data)))
