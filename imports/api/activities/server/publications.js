import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Activities } from '../activities.js';

export const ACTIVITIES_PER_PAGE = 10;

// publish all
// Meteor.publish('activities', () => Activities.find({}, { fields: Activities.publicFields }));


// Paginated query publication functions
const getActivitiesPublication = function (nextPage = 0) {
  // Handle page administration
  // Setupe the query
  const query = {};
  // Setup count
  Counts.publish(this, 'ActivitiesCount', Activities.find(query));
  // get a publication cursor
  const cursor = Activities.find(query, {
    fields: Activities.publicFields,
    skip: ACTIVITIES_PER_PAGE * nextPage,
    sort: { start_date: -1 },
    limit: ACTIVITIES_PER_PAGE,
  });
  // Return the actual publication
  return cursor;
};

Meteor.publish('activities', getActivitiesPublication);
