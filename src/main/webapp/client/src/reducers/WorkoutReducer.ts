import { WorkoutAction } from '../actions/workout/WorkoutAction'
import { WorkoutActionType } from '../actions/workout/WorkoutActionType'
import Workout, { WorkoutPreview } from '../models/workout/Workout'

export const prefab: Workout = {
  title: '',
  previews: [],
  breaks: [],
}

export type State = {
  previews: WorkoutPreview[]
  workout?: Workout
}

const initialState = {
  previews: [],
}

const reducer = (state: State = initialState, action: WorkoutAction) => {
  switch (action.type) {
    case WorkoutActionType.CLEAR_STORES:
      return { ...initialState }

    case WorkoutActionType.PREVIEWS_REQUESTED:
      return {
        ...state,
        previews: [],
      }

    case WorkoutActionType.PREVIEWS_LOADED:
      return {
        ...state,
        previews: action.payload,
      }

    case WorkoutActionType.CREATE_WORKOUT:
      return {
        ...state,
        workout: { ...prefab },
      }

    case WorkoutActionType.WORKOUT_LOADED:
      return {
        ...state,
        workout: action.payload,
      }

    case WorkoutActionType.WORKOUT_SAVED:
      return {
        ...state,
        previews: [...state.previews.filter((e) => e.id !== action.payload.id), action.payload],
        workout: undefined,
      }

    case WorkoutActionType.WORKOUT_CLOSE:
      return {
        ...state,
        workout: undefined,
      }

    default:
      return state
  }
}

export default reducer
