import {applyMiddleware, compose, createStore} from 'redux'
import {createStateSyncMiddleware, initMessageListener} from 'redux-state-sync'
import {loadState, saveState} from './redux/localStorage'

import App from './App';
import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import mainReducer from './redux/reducer'

/* State Sync Config ->  WHITELIST, BLACKLIST, ETC */
const config = {blacklist: ['SET_CHAT_MESSAGES']}

const middlewares = [createStateSyncMiddleware(config)]

const persistedState = loadState()

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);

const store = createStore(mainReducer, persistedState, enhancer)

store.subscribe(() => { saveState(store.getState()) })

initMessageListener(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


