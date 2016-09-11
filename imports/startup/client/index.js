/** @file In /client/main.js, we adopt Meteor’s suggested structure,
importing our main.html file we just created and then do an import from
/imports/startup/client. What’s this about? In Meteor 1.3 and beyond,
files stored in the /imports directory are not eagerly loaded,
meaning, Meteor does not automatically load them in your app.
Instead, we need to explicitly import them. Following this convention,
we create an index.js file in /imports/startup/client.
*/

import './routes';
