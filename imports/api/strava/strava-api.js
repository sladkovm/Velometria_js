/**
* @file Strava API methods
* can be called only on server, therefore are defined here
*/

import { Meteor } from 'meteor/meteor';
import strava from 'strava-v3';
import moment from 'moment';

import { Activities } from '../activities/activities.js';
import { Streams } from '../streams/streams';
import { ACTIVITY_TYPES } from './strava-constants.js';


/** @function - wrapper for getting strava streams */
export function getStravaStreamById(accessToken, activityId) {
  strava.streams.activity({
    access_token: accessToken,
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

export const updateMongo = (err, payload) => {
  if (err) throw err;
  console.log('Update mongo:', payload.length);
};


export const listStravaActivities = (accessToken, args) => {
  const { before, after } = args;

  if (before) {
    const epoch = moment(before).unix();
    console.log('Before:', before, epoch)
    strava.athlete.listActivities({ access_token: accessToken, before: epoch },
      Meteor.bindEnvironment((err, payload) => {
        updateMongo(err, payload);
      })
  );
  }

  if (after) {
    const epoch = moment(after).unix();
    console.log('After:', after, epoch)
    strava.athlete.listActivities({ access_token: accessToken, after: epoch },
    Meteor.bindEnvironment((err, payload) => {
      updateMongo(err, payload);
    })
  );
  }
};


/** @function - wrapper for getting recent 20 activities
* Fetched activities will be insterted into Activities collection
* There is no need to subscribe to Activities, because this function
* is run on the server */
export const getStravaActivitiesList = (accessToken) => {
  strava.athlete.listActivities(
    {
      access_token: accessToken,
    },
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
            getStravaStreamById(accessToken, res.id);
          }
        });
      }
    })
  );
};
