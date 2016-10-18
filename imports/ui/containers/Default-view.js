/** @file - Component to define the App level main container */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Activities } from '../../api/activities/activities';


class DefaultView extends Component {
  constructor(props) {
    super(props);
    this.defText = 'DefaultText';
  }

  render() {
    return (
      <Panel>
        App Main Container
        <p>{this.defText}</p>
      </Panel>
    );
  }
}


export default createContainer(() => {
  const subscription = Meteor.subscribe('activities');
  const loading = !subscription.ready();
  const activities = Activities.find().fetch();

  return { loading, activities };
}, DefaultView);
