import { Action, Dispatch } from 'redux'
import Exercise from '../../models/exercise/Exercise'
import { getAllApi, saveApi } from '../../services/ExerciseService'
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

export const getAll = () => (dispatch: Dispatch) =>
  getAllApi().then((data) => dispatch(exercisesLoaded(data)))

export const save = (exercise: Exercise) => (dispatch: Dispatch) =>
  saveApi(exercise).then((data) => dispatch(exerciseCreated(data)))
