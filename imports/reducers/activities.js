import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';
import { normalize } from 'normalizr';
import * as schema from './schema';


import { ACTIVITIES_SUB,
         ACTIVITIES_SUBSCRIPTION_READY,
         ACTIVITIES_SUBSCRIPTION_CHANGED } from '../actions/activities';


const initialState = {
  ready: false,
  byId: {},
  allIds: [],
  activitiesSubscriptionStopped: false,
};

export const activities = (state = initialState, action) => {
  // console.log('Reducer: ', action)
  switch (action.type) {
    case ACTIVITIES_SUBSCRIPTION_READY:
      return Object.assign({}, state, { ready: action.payload.ready });
    case ACTIVITIES_SUBSCRIPTION_CHANGED: {
      const payload = normalize(action.payload, schema.arrayOfActivities);
      return Object.assign({}, state,
        {
          byId: payload.entities.activities,
          allIds: payload.result,
        });
    }
    case STOP_SUBSCRIPTION:
      return action.payload === ACTIVITIES_SUB
        ? Object.assign({}, state, { activitiesSubscriptionStopped: true })
        : state;
    default:
      return state;
  }
};

export default activities;

// Selector
export const getAllActivities = (state) => {
  if (state.activities.allIds.length !== 0) { // data is loaded from Mongo
    return state.activities.allIds.map(idx => state.activities.byId[idx]);
  }
  return [];
};
