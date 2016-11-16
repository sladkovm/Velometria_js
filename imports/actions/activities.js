import { normalize } from 'normalizr';
import * as schema from './schema';


export const FETCH_ACTIVITIES_REQUEST = 'FETCH_ACTIVITIES_REQUEST';
export const FETCH_ACTIVITIES_SUCCESS = 'FETCH_ACTIVITIES_SUCCESS';
export const FETCH_ACTIVITIES_ERROR = 'FETCH_ACTIVITIES_ERROR';

export const fetchActivitiesRequest = () => ({
  type: FETCH_ACTIVITIES_REQUEST,
});

export const fetchActivitiesSuccess = (activities = []) => ({
  type: FETCH_ACTIVITIES_SUCCESS,
  payload: normalize(activities, schema.arrayOfActivities),
});

export const fetchActivitiesError = () => ({
  type: FETCH_ACTIVITIES_ERROR,
  payload: new Error(),
  error: true,
});
