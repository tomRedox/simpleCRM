import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers.jsx';
import DevTools from './DevTools.jsx';

const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
);

const store = createStore( rootReducer, {} , enhancer );

export default store;