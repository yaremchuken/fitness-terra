import { WorkoutAction } from '../actions/workout/WorkoutAction'
import { WorkoutActionType } from '../actions/workout/WorkoutActionType'
import { WorkoutPreview } from '../models/workout/Workout'

export const prefab: WorkoutPreview = {
  title: '',
  previews: [],
  rests: [],
}

export type State = {
  previews: WorkoutPreview[]
  editedTemplate?: WorkoutPreview
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

    case WorkoutActionType.EDIT_TEMPLATE:
      const templateId: number | undefined = action.payload
      return {
        ...state,
        editedTemplate: templateId
          ? state.previews.find((w) => w.templateId === templateId)
          : { ...prefab },
      }

    case WorkoutActionType.TEMPLATE_SAVED:
      return {
        ...state,
        previews: [
          ...state.previews.filter((e) => e.templateId !== action.payload.templateId),
          action.payload,
        ],
        editedTemplate: undefined,
      }

    case WorkoutActionType.CLOSE_EDITOR:
      return {
        ...state,
        editedTemplate: undefined,
      }

    default:
      return state
  }
}

export default reducer
