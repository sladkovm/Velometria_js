/**
* @file - Declare/publish collection Streams
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


/** @external - Strava API wrapper functions */
import { getStravaStreamById } from './../../server/strava.js';


export const Streams = new Mongo.Collection('streams');


if (Meteor.isServer) {
  // publish
  Meteor.publish('streams', () => Streams.find({}));
}

/** @method - Meteor methods acting on collection Streams */
Meteor.methods({
  fetchAndUpdateStream: (id) => {
    if (!Streams.findOne({ activityId: id })) {
      getStravaStreamById(id);
    }
  },
});
