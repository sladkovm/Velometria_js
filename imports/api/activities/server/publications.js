import { Meteor } from 'meteor/meteor';
// import { Counts } from 'meteor/tmeasday:publish-counts';
import { Activities } from '../activities.js';

// publish all
Meteor.publish('activities', () => Activities.find());


// // Paginated query publication functions
// const getActivitiesPublication = function (filter, activitiesPerPage, pageSkip = 0) {
//   // Setupe the query
//   let query = {};
//   switch (filter) {
//     case 'SHOW_ALL':
//       query = {};
//       break;
//     default:
//       break;
//   }
//   // Setup count
//   Counts.publish(this, 'ActivitiesCount', Activities.find(query));
//   // get a publication cursor
//   const cursor = Activities.find(query, {
//     sort: { start_date: -1 },
//     skip: pageSkip * activitiesPerPage,
//     limit: activitiesPerPage,
//   });
//   // Return the actual publication
//   return cursor;
// };
//
// Meteor.publish('activities', getActivitiesPublication);
