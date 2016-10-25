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
export const getAllActivities = (state) => {
  if (state.activities.allIds.length !== 0) { // data is loaded from Mongo
    return state.activities.allIds.map(idx => state.activities.byId[idx]);
  }
  return [];
};
