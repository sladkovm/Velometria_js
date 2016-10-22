/** @file - Redux store definition and fixtures */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../../reducers';


const configureStore = () => {
  const middlewares = [];
  if (process.env.NODE_ENV !== 'production') { // Do not return logging in production
    middlewares.push(createLogger());
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
