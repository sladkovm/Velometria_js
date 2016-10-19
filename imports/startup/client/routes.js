/** @file - set up all routes in the app*/

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import AppLayout from '../../ui/layouts/AppLayout';
import DefaultView from '../../ui/containers/Default-view';
import SidePanel from '../../ui/containers/Side-panel';
import ActivityView from '../../ui/components/Activity-view';


/** @function - Router definition */
const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={AppLayout} >
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


// Render the App by rendering router
Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
