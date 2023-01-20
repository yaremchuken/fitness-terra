import { ExerciseAction } from '../actions/exercise/ExerciseAction'
import { ExerciseActionType } from '../actions/exercise/ExerciseActionType'
import { ActivityType } from '../models/exercise/ActivityType'
import Exercise from '../models/exercise/Exercise'

export const prefab: Exercise = {
  title: '',
  type: ActivityType.WARMUP,
  muscleGroups: [],
  repeats: 0,
  duration: 0,
  calories: 0,
  equipment: [],
}

export type State = {
  previews: Exercise[]
  template?: Exercise
}

const initialState = {
  previews: [],
}

const reducer = (state: State = initialState, action: ExerciseAction) => {
  switch (action.type) {
    case ExerciseActionType.CLEAR_STORES:
      return { ...initialState }

    case ExerciseActionType.PREVIEWS_REQUESTED:
      return {
        ...state,
        previews: [],
      }

    case ExerciseActionType.PREVIEWS_LOADED:
      return {
        ...state,
        previews: action.payload,
      }

    case ExerciseActionType.CREATE_TEMPLATE:
      return {
        ...state,
        template: { ...prefab },
      }

    case ExerciseActionType.TEMPLATE_LOADED:
      return {
        ...state,
        template: action.payload,
      }

    case ExerciseActionType.TEMPLATE_SAVED:
      return {
        ...state,
        previews: [...state.previews.filter((e) => e.id !== action.payload.id), action.payload],
        template: undefined,
      }

    case ExerciseActionType.TEMPLATE_CLOSE:
      return {
        ...state,
        template: undefined,
      }

    default:
      return state
  }
}

export default reducer
