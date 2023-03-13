import { ExerciseAction } from '../actions/exercise/ExerciseAction'
import { ExerciseActionType } from '../actions/exercise/ExerciseActionType'
import { ExercisePreview } from '../models/workout/Exercise'

export type State = {
  previews: ExercisePreview[]
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

    case ExerciseActionType.TEMPLATE_SAVED:
      return {
        ...state,
        previews: [
          ...state.previews.filter((e) => e.templateId !== action.payload.templateId),
          action.payload,
        ],
      }

    default:
      return state
  }
}

export default reducer
