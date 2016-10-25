/** @file this an App layout definition */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import { Activities } from '../../api/activities/activities';
import { Streams } from '../../api/streams/streams';
import receiveActivities from '../../actions/receiveActivities';
import receiveStreams from '../../actions/receiveStreams';


class AppLayout extends Component {
  componentDidMount() {
    console.log('componentDidMount')
    this.storeActivities();
    this.storeStreams();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
    this.storeActivities();
    this.storeStreams();
  }

  storeActivities() {
    const { isReadyActivities, activities, dispatch, state } = this.props;
    if (!isReadyActivities) {
      // console.log('Loading', state);
    } else {
      // console.log('dispatching', state);
      dispatch(receiveActivities(activities));
    }
  }

  storeStreams() {
    const { isReadyStreams, streams, dispatch, state } = this.props;
    if (!isReadyStreams) {
    } else {
      dispatch(receiveStreams(streams));
    }
  }

  render() {
    // this.storeActivities();
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
  isReadyActivities: PropTypes.bool,
  activities: PropTypes.array,
  isReadyStreams: PropTypes.bool,
  streams: PropTypes.array,
};

// Create Meteor Data container to connect pub/sub data to the component
const getMeteorData = () => {
  const handleActivities = Meteor.subscribe('activities');
  const isReadyActivities = handleActivities.ready();
  const activities = Activities.find().fetch();

  const handleStreams = Meteor.subscribe('streams');
  const isReadyStreams = handleStreams.ready();
  const streams = Streams.find().fetch();

  return { isReadyActivities, activities, isReadyStreams, streams };
};

const AppLayoutContainer = createContainer(getMeteorData, AppLayout);

// Connect to the Redux store
export default connect()(AppLayoutContainer);
