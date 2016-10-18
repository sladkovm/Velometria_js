/** @file - all list-related publications */

import { Meteor } from 'meteor/meteor';
import { Streams } from '../streams';

Meteor.publish('streams', () => Streams.find());
