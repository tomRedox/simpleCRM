import thunk from 'redux-thunk';
import { devTools, persistState } from 'redux-devtools';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers.jsx';
import DevTools from './DevTools.jsx';

const store = createStore( rootReducer, applyMiddleware(thunk) );

export default store;