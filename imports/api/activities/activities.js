/** @file - all Activities-related publications
* allow/deny
* Schema handling via SimpleSchema
*/

import { Mongo } from 'meteor/mongo';


export const Activities = new Mongo.Collection('activities');


Activities.publicFields = {
  id: 1,
  name: 1,
  start_date: 1,
};

Activities.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
