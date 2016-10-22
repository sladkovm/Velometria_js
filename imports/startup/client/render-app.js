/** @file - the actual rendering of the app */

import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import configureProvider from './provider-config';

// Render the App by rendering router
Meteor.startup(() => {
  render(configureProvider(), document.getElementById('render-target'));
});
