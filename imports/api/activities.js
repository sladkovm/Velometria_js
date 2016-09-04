/**
* @file - Declare/publish collection Activiies
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Activities = new Mongo.Collection('activities');


if (Meteor.isServer) {
  // publish
  Meteor.publish('activities', () => Activities.find({}));
  // methods
  Meteor.methods({
    // Here goes the list of DB methods: instert, update, delete, etc...
  });
}
