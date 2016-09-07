/**
* @file Strava API methods
* can be called only on server, therefore are defined here
*/


/** @external - Meteor modules */
import { Meteor } from 'meteor/meteor';


/** @external - wrapper for Strava API */
import strava from 'strava-v3';


/** @external - Mongo collections */
import { Activities } from '../imports/api/activities.js';
import { Streams } from '../imports/api/streams.js';

/** @external - Strava API credentials */
import { STRAVA_ACCESS_TOKEN } from './strava-config';


/** @const Stream types supported by Strava API*/
const ACTIVITY_TYPES = ['time', 'lating', 'distance', 'altitude', 'velocity_smooth',
    'heartrate', 'cadence', 'watts', 'moving_grade_smooth'];


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

/** @function - wrapper for getting strava streams */
export function getStravaStreamById(activityId) {
  strava.streams.activity({ access_token: STRAVA_ACCESS_TOKEN,
     id: activityId,
    types: ACTIVITY_TYPES },
    Meteor.bindEnvironment((err, payload) => {
      if (err) {
        throw err;
      } else {
        const stream = payload;
        stream.activityId = activityId;
        // add activityId to the Stream so it can be easily found later
        Streams.insert(stream);
        console.log('getStravaStreamById(): fetching streams for ID = ', activityId);
      }
    }));
}
