import { Action, Dispatch } from 'redux'
import Exercise from '../../models/exercise/Exercise'
import { getAllTemplatesApi, saveTemplateApi } from '../../services/ExerciseService'
import { ExerciseActionType } from './ExerciseActionType'

export interface ExerciseAction extends Action<ExerciseActionType> {
  payload?: any
}

export const requestExercises = () => {
  return {
    type: ExerciseActionType.EXERCISES_REQUESTED,
  }
}

export const exercisesLoaded = (exercises: Exercise[]) => {
  return {
    type: ExerciseActionType.EXERCISES_LOADED,
    payload: exercises,
  }
}

export const exerciseCreated = (exercise: Exercise) => {
  return {
    type: ExerciseActionType.EXERCISE_SAVED,
    payload: exercise,
  }
}

export const getAllTemplates = () => (dispatch: Dispatch) =>
  getAllTemplatesApi().then((data) => dispatch(exercisesLoaded(data)))

export const saveTemplate = (exercise: Exercise) => (dispatch: Dispatch) =>
  saveTemplateApi(exercise).then((data) => dispatch(exerciseCreated(data)))
