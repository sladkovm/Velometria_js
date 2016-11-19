import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';
import { normalize } from 'normalizr';
import * as schema from './schema';


import { STREAMS_SUB,
         STREAMS_SUBSCRIPTION_READY,
         STREAMS_SUBSCRIPTION_CHANGED } from '../actions/streams';


const initialState = {
  ready: false,
  byId: {},
  allIds: [],
  streamsSubscriptionStopped: false,
};

export const streams = (state = initialState, action) => {
  // console.log('Reducer: ', action)
  switch (action.type) {
    case STREAMS_SUBSCRIPTION_READY:
      return Object.assign({}, state, { ready: action.payload.ready });
    case STREAMS_SUBSCRIPTION_CHANGED: {
      const payload = normalize(action.payload, schema.arrayOfStreams);
      return Object.assign({}, state,
        {
          byId: payload.entities.streams,
          allIds: payload.result,
        });
    }
    case STOP_SUBSCRIPTION:
      return action.payload === STREAMS_SUB
        ? Object.assign({}, state, { streamsSubscriptionStopped: true })
        : state;
    default:
      return state;
  }
};

export default streams;

// Selector
export const getAllStreams = (state) => {
  if (state.streams.allIds.length !== 0) { // data is loaded from Mongo
    return state.streams.allIds.map(idx => state.streams.byId[idx]);
  }
  return [];
};
