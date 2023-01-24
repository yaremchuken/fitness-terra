import { combineReducers } from 'redux'
import exercise, { State as ExerciseReducerState } from './ExerciseReducer'
import workout, { State as WorkoutReducerState } from './WorkoutReducer'
import reducer, { State as ReducerState } from './Reducer'

export const rootReducer = combineReducers({
  reducer,
  exercise,
  workout,
})

export type StoreState = {
  reducer: ReducerState
  exercise: ExerciseReducerState
  workout: WorkoutReducerState
}
