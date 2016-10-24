/** @file - set up all routes in the app */

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import AppLayoutContainer from '../../ui/containers/AppLayout';
import DefaultView from '../../ui/containers/Default-view';
import SidePanel from '../../ui/containers/Side-panel';
import ActivityView from '../../ui/containers/Activity-view';


/** @function - Router definition */
const configureRouter = () => (
  <Router history={browserHistory}>
    <Route component={AppLayoutContainer} >
      <Route
        path="/"
        components={{ mainView: DefaultView, sidePanel: SidePanel }}
      />
      <Route
        path="/activity/:id"
        components={{ mainView: ActivityView, sidePanel: SidePanel }}
      />
    </Route>
  </Router>
);
// Passing :id will make it available at the components via props.params.id


export default configureRouter;
