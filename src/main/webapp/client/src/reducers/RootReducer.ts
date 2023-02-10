import { combineReducers } from 'redux'
import exercise, { State as ExerciseReducerState } from './ExerciseReducer'
import workout, { State as WorkoutReducerState } from './WorkoutReducer'
import scheduler, { State as ScheduleReducerState } from './ScheduleReducer'
import reducer, { State as ReducerState } from './Reducer'

export const rootReducer = combineReducers({
  reducer,
  exercise,
  workout,
  scheduler,
})

export type StoreState = {
  reducer: ReducerState
  exercise: ExerciseReducerState
  workout: WorkoutReducerState
  scheduler: ScheduleReducerState
}
