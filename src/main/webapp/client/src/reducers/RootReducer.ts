import { combineReducers } from 'redux'
import reducer, { State as ReducerState } from './Reducer'
import exercise, { State as ExerciseReducerState } from './ExerciseReducer'

export const rootReducer = combineReducers({
  reducer,
  exercise,
})

export type StoreState = {
  reducer: ReducerState
  exercise: ExerciseReducerState
}
