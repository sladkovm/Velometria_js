import { normalize } from 'normalizr';
import * as schema from './schema';
export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';

const receiveActivities = (activities) => {
  return ({
    type: RECEIVE_ACTIVITIES,
    response: normalize(activities, schema.arrayOfActivities)
  })
};

export default receiveActivities;
