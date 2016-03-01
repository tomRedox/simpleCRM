import { createStore, combineReducers, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';

//const { DevTools, DebugPanel, LogMonitor } = ReactReduxDevTools;
import rootReducer from './reducers.jsx';
const { logger } = 'redux-devtools-log-monitor';
import DevTools from './DevTools.jsx';


// Redux has a single store. to reduce complexity it allows you to combine
// several 'reducer' functions that share this single state object.
// They are combined into one root reducer which is passed to the store
//
// the shape of root reducer will then look like:
//    {
//      userInterface: {
//        selectedId: 'ds34sjsa34',
//        selectedCustomerName: 'Bob Smith'
//      },
//      customers: [
//        { mongo doc },
//        { mongo doc },
//        { mongo doc }
//      ]
//    }


const finalCreateStore =
  applyMiddleware(/*logger*/)(
    //devTools()(
    //  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))(
          createStore
    //  )
    //)
  );

// applyMiddleware takes createStore() and returns a new wrapped createStore
// note, this is an optional step to use middleware (we're auto console.log dispatches)
// let createStoreWithMiddleware = applyMiddleware(logger)(createStore);
// store = createStoreWithMiddleware(rootReducer);
// 
//store = finalCreateStore(rootReducer);



function configureStore(initialState) {
  console.log("configureStore rootReducer:", [ rootReducer, initialState ]);
  const result = finalCreateStore(rootReducer , initialState);
  console.log("result",result);

  return result;
}

export function getStore() {

  return store;
}

store = configureStore();
