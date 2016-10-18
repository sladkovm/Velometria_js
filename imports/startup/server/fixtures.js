/** @file - fill the DB with example data on startup */

import { Meteor } from 'meteor/meteor';
import { Activities } from '../../api/activities/activities';
import { getStravaActivitiesList } from '../../api/strava/strava-api';
import stravaConfig from './strava-config.json';

const { STRAVA_ACCESS_TOKEN } = stravaConfig;


const getExampleData = (accessToken) => {
  if (!Activities.findOne()) { // Activities collection is empty
    getStravaActivitiesList(accessToken);
  } else {
    console.log('Collection Activities contains %i entries', Activities.find().count());
  }
};


Meteor.startup(() => {
  getExampleData(STRAVA_ACCESS_TOKEN);
});
