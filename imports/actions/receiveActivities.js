export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';

const receiveActivities = (activities) => ({
  type: RECEIVE_ACTIVITIES,
  activities
});

export default receiveActivities;
