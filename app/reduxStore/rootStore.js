// Libraries
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Root reducer
import rootReducer from './rootReducer';

// Connect our store to the reducers
export const store =  createStore(rootReducer, applyMiddleware(thunk));
