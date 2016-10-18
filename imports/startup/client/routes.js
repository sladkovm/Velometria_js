/** @file - set up all routes in the app*/

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from '../../ui/App';
import DefaultView from '../../ui/containers/Default-view';
import ActivityView from '../../ui/containers/Activity-view';
import SidePanel from '../../ui/containers/Side-panel';


/** @function - Router definition */
const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={App} >
      <Route
        path="/"
        components={{ mainView: DefaultView, sidePanel: SidePanel }}
      />
      <Route
        path="/activity/:_id"
        components={{ mainView: ActivityView, sidePanel: SidePanel }}
      />
    </Route>
  </Router>
);


// Render the App by rendering router
Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
