/** @file this an App layout definition */

import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';

import Header from '../components/Header';


import { loadActivities } from '../../actions/activities';
import { loadStreams } from '../../actions/streams';


class AppLayout extends Component {
  componentDidMount() {
    this.props.getActivities(this.props.currentPage);
    this.props.getStreams();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      this.props.getActivities(nextProps.currentPage);
    }
    // this.props.getStreams();
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


export const mapStateToProps = (state) => {
  return ({
    activities: state.activities,
    activitiesCount: Counts.get('ActivitiesCount'),
    currentPage: state.page.currentPage,
    streams: state.streams,
  });
};

export const mapDispatchToProps = (dispatch) => ({
  getActivities: (page) => dispatch(loadActivities(page)),
  getStreams: () => dispatch(loadStreams()),
});

// Connect to the Redux store
const AppLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(AppLayout);
export default AppLayoutContainer;
