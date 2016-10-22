/** @file - reducers*/
import { RECEIVE_ACTIVITIES } from '../actions/receiveActivities';


const activities = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return action.activities;
    default:
      return state;
  }
};

export default activities;
