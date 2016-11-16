/** @file - reducers*/
import { combineReducers } from 'redux';

import { FETCH_STREAMS_REQUEST,
         FETCH_STREAMS_SUCCESS,
         FETCH_STREAMS_ERROR } from '../actions/streams';


const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_STREAMS_REQUEST:
      return true;
    case FETCH_STREAMS_SUCCESS:
    case FETCH_STREAMS_ERROR:
      return false;
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS_SUCCESS:
      // console.log(action.response)
      return Object.assign({}, action.payload.entities.streams);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_STREAMS_SUCCESS:
      return [...action.payload.result];
    default:
      return state;
  }
};

const streams = combineReducers({ byId, allIds, isFetching });

export default streams;

// Selector
export const getAllStreams = (state) => {
  if (state.streams.allIds.length !== 0) { // data is loaded from Mongo
    return state.streams.allIds.map(idx => state.streams.byId[idx]);
  }
  return [];
};
