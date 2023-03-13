import { WorkoutAction } from '../actions/workout/WorkoutAction'
import { WorkoutActionType } from '../actions/workout/WorkoutActionType'
import Workout, { WorkoutPreview } from '../models/workout/Workout'

export type State = {
  previews: WorkoutPreview[]
  performed?: Workout
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

    case WorkoutActionType.TEMPLATE_SAVED:
      return {
        ...state,
        previews: [
          ...state.previews.filter((w) => w.templateId !== action.payload.templateId),
          action.payload,
        ],
      }

    case WorkoutActionType.WORKOUT_REQUESTED:
      return {
        ...state,
        performed: undefined,
      }

    case WorkoutActionType.WORKOUT_LOADED:
      return {
        ...state,
        performed: action.payload,
      }

    case WorkoutActionType.WORKOUT_PERFORM_CLOSED:
      return {
        ...state,
        performed: undefined,
      }

    case WorkoutActionType.WORKOUT_COMPLETED:
      return {
        ...state,
        previews: [...state.previews.filter((w) => w.id !== action.payload.id), action.payload],
      }

    default:
      return state
  }
}

export default reducer
