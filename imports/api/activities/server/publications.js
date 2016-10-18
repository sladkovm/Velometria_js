import { Meteor } from 'meteor/meteor';
import { Activities } from '../activities.js';

// publish
Meteor.publish('activities', () => Activities.find());
