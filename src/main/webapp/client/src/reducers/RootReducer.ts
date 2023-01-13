import { combineReducers } from 'redux'
import reducer, { State as ReducerState } from './Reducer'
import auth, { State as AuthState } from './AuthReducer'
import exercise, { State as ExerciseReducerState } from './ExerciseReducer'

export const rootReducer = combineReducers({
  reducer,
  auth,
  exercise,
})

export type StoreState = {
  auth: AuthState
  reducer: ReducerState
  exercise: ExerciseReducerState
}
