/** @file - Component to define the App level right side pannel */

/** @external - Meteor modules */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

import ActivityPanel from '../components/ActivityPanel.js';
import { Loading } from '../components/Loading';
import { Activities } from '../../api/activities/activities';


class SidePanel extends Component {

  renderActivities() {
    const { loading, activities } = this.props;

    return loading ?
      <Loading /> :
      activities.map((activity) => (
        <ActivityPanel
          key={activity.id}
          activity={activity}
        />
      ), this);
  }

  render() {
    return (
      // <Panel>
        <div>{this.renderActivities()}</div>
      // </Panel>
    );
  }
}

SidePanel.PropTypes = {
  loading: PropTypes.bool.isRequired,
  activities: PropTypes.array.isRequired,
};


export default createContainer(() => {
  const subscription = Meteor.subscribe('activities');
  const loading = !subscription.ready();
  const activities = Activities.find().fetch();

  return { loading, activities };
}, SidePanel);
