import { Action, Dispatch } from 'redux'
import Exercise from '../../models/workout/Exercise'
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

export const getPreviews = () => (dispatch: Dispatch) => {
  dispatch(requestPreviews())
  return getPreviewsApi().then((data) =>
    dispatch({
      type: ExerciseActionType.PREVIEWS_LOADED,
      payload: data,
    })
  )
}

export const getTemplate = (id: number) => getTemplateApi(id)

export const saveTemplate = (exercise: Exercise) => (dispatch: Dispatch) =>
  saveTemplateApi(exercise).then((data) =>
    dispatch({
      type: ExerciseActionType.TEMPLATE_SAVED,
      payload: data,
    })
  )
