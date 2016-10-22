/** @file - Component to define the App level right side pannel */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import ActivityPanel from '../components/ActivityPanel.js';
import { Loading } from '../components/Loading';


class SidePanel extends Component {
  renderActivities() {
    const { activities } = this.props;
    return !activities ?
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
      <div>
        {this.renderActivities()}
      </div>
      // </Panel>
    );
  }
}


const mapStateToProps = (state) => ({
  activities: state.activities,
});
export default connect(mapStateToProps)(SidePanel);
