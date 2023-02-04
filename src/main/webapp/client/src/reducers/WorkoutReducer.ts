import { WorkoutAction } from '../actions/workout/WorkoutAction'
import { WorkoutActionType } from '../actions/workout/WorkoutActionType'
import Workout, { WorkoutPreview } from '../models/workout/Workout'

export const prefab: WorkoutPreview = {
  title: '',
  previews: [],
  rests: [],
}

export type State = {
  previews: WorkoutPreview[]
  edited?: WorkoutPreview
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

    case WorkoutActionType.WORKOUT_LOADED:
      return {
        ...state,
        workout: action.payload,
      }

    case WorkoutActionType.EDIT_WORKOUT:
      const workoutId: number | undefined = action.payload
      return {
        ...state,
        edited: workoutId ? state.previews.find((w) => w.id === workoutId) : { ...prefab },
      }

    case WorkoutActionType.WORKOUT_SAVED:
      return {
        ...state,
        previews: [...state.previews.filter((e) => e.id !== action.payload.id), action.payload],
        edited: undefined,
      }

    case WorkoutActionType.CLOSE_EDITOR:
      return {
        ...state,
        edited: undefined,
      }

    default:
      return state
  }
}

export default reducer
