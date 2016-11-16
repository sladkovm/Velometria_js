/** @file this an App layout definition */

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import { Activities } from '../../api/activities/activities';
import { Streams } from '../../api/streams/streams';

import { fetchActivitiesRequest,
         fetchActivitiesSuccess } from '../../actions/activities';
import { fetchStreamsRequest,
         fetchStreamsSuccess } from '../../actions/streams';


class AppLayout extends Component {
  componentDidMount() {
    // console.log('componentDidMount')
    this.storeActivities();
    this.storeStreams();
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate')
    this.storeActivities();
    this.storeStreams();
  }

  storeActivities() {
    const { isReadyActivities, activities, dispatch } = this.props;

    if (!isReadyActivities) {
      dispatch(fetchActivitiesRequest());
    } else {
      dispatch(fetchActivitiesSuccess(activities));
    }
  }

  storeStreams() {
    const { isReadyStreams, streams, dispatch } = this.props;
    if (!isReadyStreams) {
      dispatch(fetchStreamsRequest());
    } else {
      dispatch(fetchStreamsSuccess(streams));
    }
  }

  render() {
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

// Create Meteor Container wrapper
const AppLayoutContainer = createContainer(getMeteorData, AppLayout);

export const mapStateToProps = (state) => ({
  isFetchingActivities: state.activities.isFetching,
  isFetchingStreams: state.streams.isFetching,
});

// Connect to the Redux store
export default connect(mapStateToProps)(AppLayoutContainer);
