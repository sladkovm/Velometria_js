import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';

import { Activities } from '../api/activities/activities';


export const ACTIVITIES_SUB = 'activities';
export const ACTIVITIES_SUBSCRIPTION_READY = 'ACTIVITIES_SUBSCRIPTION_READY';
export const ACTIVITIES_SUBSCRIPTION_CHANGED = 'ACTIVITIES_SUBSCRIPTION_CHANGED';


// Add filter, perPageLimit, pageSkip inputs
export const loadActivities = () =>
  startSubscription({
    key: ACTIVITIES_SUB,
    get: () => Activities.find().fetch(),
    subscribe: () => Meteor.subscribe(ACTIVITIES_SUB),
  });
