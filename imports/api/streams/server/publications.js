import { Meteor } from 'meteor/meteor';
import { Streams } from '../streams';

// Paginated query publication functions
const getStreamPublication = function (id) {
  // Setupe the query
  const query = { activityId: +id };
  // get a publication cursor
  const cursor = Streams.find(query);
  // Return the actual publication
  return cursor;
};

Meteor.publish('currentStream', getStreamPublication);
