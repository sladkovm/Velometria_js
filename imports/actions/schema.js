import { Schema, arrayOf } from 'normalizr';

export const activitiy = new Schema('activities');
export const arrayOfActivities = arrayOf(activitiy);
