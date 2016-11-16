import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Activities } from '../activities.js';

// publish all
Meteor.publish('activities', () => Activities.find());


const getActivitiesPublication = (filter, pageSkip = 0) => {
  let query = {};

  switch (filter) {
    case 'SHOW_ALL':
      query = {};
      break;
    default:
      break;
  }
  Counts.publish(this, 'ActivitiesCount', Activities.find(query));
  return Activities.find(query, {
    skip: pageSkip,
    limit: 10,
  });
};


// publish per page
Meteor.publish('getActivities', getActivitiesPublication);
