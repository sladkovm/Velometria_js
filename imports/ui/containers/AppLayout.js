/** @file this an App layout definition */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import { Activities } from '../../api/activities/activities';
import receiveActivities from '../../actions/receiveActivities';


class AppLayout extends Component {
  componentDidMount() {
    this.storeMeteorData();
  }

  componentDidUpdate() {
    this.storeMeteorData();
  }

  storeMeteorData() {
    const { isReady, activities, dispatch } = this.props;
    if (!isReady) {
      // console.log('Loading', state);
    } else {
      // console.log('dispatching', state);
      dispatch(receiveActivities(activities));
    }
  }

  render() {
    // this.storeMeteorData();
    const { mainView, sidePanel } = this.props;
    return (
      <Grid>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col md={8}>
            { mainView }
          </Col>
          <Col md={4}>
            { sidePanel }
          </Col>
        </Row>
      </Grid>
    );
  }
}

AppLayout.propTypes = {
  handle: PropTypes.object,
  isReady: PropTypes.bool,
  activities: PropTypes.array,
};

// Create Meteor Data container to connect pub/sub data to the component
const getMeteorData = () => {
  const handle = Meteor.subscribe('activities');
  const isReady = handle.ready();
  const activities = Activities.find().fetch();
  return { handle, isReady, activities };
};
const AppLayoutContainer = createContainer(getMeteorData, AppLayout);

// Connect to the Redux store
export default connect()(AppLayoutContainer);
