import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers/RootReducer';

// TODO: Rewrite using Redux Toolkit
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
