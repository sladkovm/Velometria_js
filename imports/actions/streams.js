import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';

import { Streams } from '../api/streams/streams';


export const STREAMS_SUB = 'streams';
export const STREAMS_SUBSCRIPTION_READY = 'STREAMS_SUBSCRIPTION_READY';
export const STREAMS_SUBSCRIPTION_CHANGED = 'STREAMS_SUBSCRIPTION_CHANGED';


// Add filter, perPageLimit, pageSkip inputs
export const loadStreams = () =>
  startSubscription({
    key: STREAMS_SUB,
    get: () => Streams.find().fetch(),
    subscribe: () => Meteor.subscribe(STREAMS_SUB),
  });
