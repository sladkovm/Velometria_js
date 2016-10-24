/** @file - reducers*/
import { combineReducers } from 'redux';

import { RECEIVE_ACTIVITIES } from '../actions/receiveActivities';


const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return Object.assign({}, action.response.entities.activities);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return [...action.response.result];
    default:
      return state;
  }
};

const activities = combineReducers({ byId, allIds });

export default activities;

// Selector
export const getActivitiesById = (state, id = undefined) => {
  if (state.activities.allIds.length !== 0) { // data is loaded from Mongo
    if (id) { // Return one activitie
      return state.activities.byId[id];
    } // Return all activities
    return state.activities.allIds.map(idx => state.activities.byId[idx]);
  }
  return [];
};
