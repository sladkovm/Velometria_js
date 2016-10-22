/** @file - providing redux store to the App components */

import React from 'react';
import { Provider } from 'react-redux';


import configureRouter from './router-config.js';
import configureStore from './store-config.js';


const store = configureStore();

// Shall I dispatch the first fetchData already here?

const configureProvider = () => (
  <Provider store={store}>
    {configureRouter()}
  </Provider>
);

export default configureProvider;
