/** @file - Redux store definition and fixtures */
import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../../reducers';


const configureStore = () => {
  const {
    sources,
    subscriptions,
  } = createReactiveMiddlewares(Tracker);

  const middlewares = [sources, subscriptions, thunk];
  if (process.env.NODE_ENV !== 'production') { // Do not return logging in production
    middlewares.push(createLogger());
  }

  return createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );
};

export default configureStore;
