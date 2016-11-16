/** @file - reducers*/
import { combineReducers } from 'redux';


import { FETCH_ACTIVITIES_REQUEST,
         FETCH_ACTIVITIES_SUCCESS,
         FETCH_ACTIVITIES_ERROR } from '../actions/activities';


const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES_REQUEST:
      return true;
    case FETCH_ACTIVITIES_SUCCESS:
    case FETCH_ACTIVITIES_ERROR:
      return false;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES_SUCCESS:
      return Object.assign({}, action.payload.entities.activities);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES_SUCCESS:
      return [...action.payload.result];
    default:
      return state;
  }
};

const activities = combineReducers({ byId, allIds, isFetching });

export default activities;

// Selector
export const getAllActivities = (state) => {
  if (state.activities.allIds.length !== 0) { // data is loaded from Mongo
    return state.activities.allIds.map(idx => state.activities.byId[idx]);
  }
  return [];
};
