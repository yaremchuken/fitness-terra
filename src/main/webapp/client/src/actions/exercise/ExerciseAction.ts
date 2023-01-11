import { Action, Dispatch } from 'redux'
import Exercise from '../../models/exercise/Exercise'
import { createApi, getAllApi } from '../../services/ExerciseService'
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
    type: ExerciseActionType.EXERCISE_CREATED,
    paylod: exercise,
  }
}

export const getAll = () => (dispatch: Dispatch) =>
  getAllApi().then((data) => dispatch(exercisesLoaded(data)))

export const create = (exercise: Exercise) => (dispatch: Dispatch) =>
  createApi(exercise).then((data) => dispatch(exerciseCreated(data)))
