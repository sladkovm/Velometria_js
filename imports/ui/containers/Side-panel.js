/** @file - Component to define the App level right side pannel */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import ActivityPanelItem from '../components/activity-panel-item.js';
import { Loading } from '../components/Loading';
import { getAllActivities } from '../../reducers/activities';


class SidePanel extends Component {
  renderActivities() {
    const { activities } = this.props;
    return !activities ?
      <Loading /> :
      <ListGroup>
        {activities.map((activity) => (
          <ActivityPanelItem
            key={activity.id}
            activity={activity}
          />
        ))}
      </ListGroup>;
  }

  render() {
    return (
      // <Panel>
      <div>
        {this.renderActivities()}
      </div>
      // </Panel>
    );
  }
}


const mapStateToProps = (state) => ({
  activities: getAllActivities(state),
});
export default connect(mapStateToProps)(SidePanel);
