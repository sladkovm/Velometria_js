import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';

import { Streams } from '../api/streams/streams';


export const CURRENTSTREAM_SUB = 'currentStream';
export const CURRENTSTREAM_SUBSCRIPTION_READY = 'CURRENTSTREAM_SUBSCRIPTION_READY';
export const CURRENTSTREAM_SUBSCRIPTION_CHANGED = 'CURRENTSTREAM_SUBSCRIPTION_CHANGED';


// Add filter, perPageLimit, pageSkip inputs
export const loadCurrentStream = (id) =>
  startSubscription({
    key: CURRENTSTREAM_SUB,
    get: () => Streams.findOne(),
    subscribe: () => Meteor.subscribe(CURRENTSTREAM_SUB, id),
  });
