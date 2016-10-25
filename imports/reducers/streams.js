/** @file - reducers*/
import { combineReducers } from 'redux';

import { RECEIVE_STREAMS } from '../actions/receiveStreams';


const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STREAMS:
      console.log(action.response)
      return Object.assign({}, action.response.entities.streams);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_STREAMS:
      return [...action.response.result];
    default:
      return state;
  }
};

const streams = combineReducers({ byId, allIds });

export default streams;

// Selector
export const getAllActivities = (state) => {
  if (state.streams.allIds.length !== 0) { // data is loaded from Mongo
    return state.streams.allIds.map(idx => state.streams.byId[idx]);
  }
  return [];
};
