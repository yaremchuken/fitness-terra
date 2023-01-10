import { combineReducers } from 'redux';
import reducer, { State as ReducerState } from './Reducer';

export const rootReducer = combineReducers({
  reducer,
});

export type StoreState = {
  reducer: ReducerState;
};
