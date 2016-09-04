import { Meteor } from 'meteor/meteor';

import { getStravaActivitiesList } from './strava.js';
import { Activities } from '../imports/api/activities.js';

Meteor.startup(() => {
  if (!Activities.findOne()) { // Activities collection is empty
    getStravaActivitiesList();
  } else {
    console.log('Collection Activities contains %i entries', Activities.find().count())
  }
});
