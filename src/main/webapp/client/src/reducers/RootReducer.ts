import { combineReducers } from 'redux'
import exercise, { State as ExerciseReducerState } from './ExerciseReducer'
import reducer, { State as ReducerState } from './Reducer'

export const rootReducer = combineReducers({
  reducer,
  exercise,
})

export type StoreState = {
  reducer: ReducerState
  exercise: ExerciseReducerState
}
