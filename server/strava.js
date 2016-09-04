/**
* @file Strava API methods
* can be called only on server, therefore are defined here
*/

import { Meteor } from 'meteor/meteor';
import strava from 'strava-v3';
import { Activities } from '../imports/api/activities.js';


import { STRAVA_ACCESS_TOKEN } from './strava-config';

/** @function - wrapper for getting recent 20 activities
* Fetched activities will be insterted into Activities collection
* There is no need to subscribe to Activities, because this function
* is run on the server */
export function getStravaActivitiesList() {
  strava.athlete.listActivities({ access_token: STRAVA_ACCESS_TOKEN },
        Meteor.bindEnvironment((err, payload) => {
          if (err) {
            throw err;
          } else {
            // console.log('getStravaAthleteActivitiesList()', payload[0])
            payload.forEach((res) => {
              if (res) { // Check if exist
                console.log('strava.js: getStravaActivitiesList(): Fetching activity with ID = ',
                 res.id);
                // Insert activity header to the StravaActivities
                Activities.insert(res);
                // Fetch the Stream related to the activity
                // getStravaStreamById(res.id)
              }
            });
          }
        }));
}
