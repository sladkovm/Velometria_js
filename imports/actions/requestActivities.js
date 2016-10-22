export const REQUEST_ACTIVITIES = 'REQUEST_ACTIVITIES';

const requestActivities = () => ({
  type: REQUEST_ACTIVITIES,
  isRequestPending: true,
});

export default requestActivities;
