/** @file - Component to define the App level main container */

/** @external - Meteor modules */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

/** @external - React modules */
import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';


/** @external - Child React components */
import Activity from './Activity';


/** @external - import Activities collection to subscribe to */
import { Activities } from '../../api/activities';


/** @class - Main view contaner of the App */
class DefaultView extends Component {
  constructor(props) {
    super(props);
    this.defText = 'DefaultText';
  }

  render() {
    return (<Panel>
              App Main Container
              <p>{this.defText}</p>
            </Panel>)
  }
}



/** @exports - return smart component App with bind to Activities collection
* This will create this.props.activities property on the component App
*/
export default createContainer(() => {
  const subscription = Meteor.subscribe('activities');
  const loading = !subscription.ready();
  const activities = Activities.find().fetch();

  return { loading, activities };
}, DefaultView);
