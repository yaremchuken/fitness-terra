import { ExerciseAction } from '../actions/exercise/ExerciseAction'
import { ExerciseActionType } from '../actions/exercise/ExerciseActionType'
import Exercise from '../models/exercise/Exercise'

export type State = {
  exercises: Exercise[]
}

const initialState = {
  exercises: [],
}

const reducer = (state: State = initialState, action: ExerciseAction) => {
  switch (action.type) {
    case ExerciseActionType.CLEAR_STORES:
      return { ...initialState }

    case ExerciseActionType.EXERCISES_REQUESTED:
      return {
        ...state,
        exercises: [],
      }

    case ExerciseActionType.EXERCISES_LOADED:
      return {
        ...state,
        exercises: action.payload,
      }

    case ExerciseActionType.EXERCISE_CREATED:
      return {
        ...state,
        exercises: [...state.exercises, action.payload],
      }

    default:
      return state
  }
}

export default reducer
