import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { App } from '../../ui/App.js';
import DefaultView from '../../ui/ui-components/Default-view';
import SidePanel from '../../ui/ui-components/Side-panel';


/** @function - Router definition */
const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={App} >
      <Route
        path="/"
        components={{ mainView: DefaultView, sidePanel: SidePanel }}
      />
    </Route>
  </Router>
);


/** @function - render the App by rendering router */
Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
