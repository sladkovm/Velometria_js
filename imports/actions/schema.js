import { Schema, arrayOf } from 'normalizr';

export const activitiy = new Schema('activities');
export const arrayOfActivities = arrayOf(activitiy);

export const stream = new Schema('streams', { idAttribute: 'activityId' });
export const arrayOfStreams = arrayOf(stream);
