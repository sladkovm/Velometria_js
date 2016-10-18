/** @file - all Activities-related publications
* allow/deny
* Schema handling via SimpleSchema
*/

import { Mongo } from 'meteor/mongo';


export const Activities = new Mongo.Collection('activities');
