/** @file this an App layout definition
* The App is subscribed to the collection Activities using the
* meteor createContainer smart component wrapper
* acivities can be accessed as this.props.activities
*/


import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Grid, Col, Row, Panel, ListGroup } from 'react-bootstrap';

import AppHeader from './ui-components/App-header';
import Activity from './ui-components/activity';

/** @external - import Activities collection to subscribe to */
import { Activities } from '../api/activities';


/** @classdesc - main layout of the page, export will be done as a smart component*/
export class App extends Component {
  constructor(props) {
    super(props);
  }

  /** @method - convert fetched activities list into list of Activity components */
  renderActivities() {
    const loading = this.props.loading;
    return loading ? 'Loading' : this.props.activities.map((activity) => (
      <Activity key={activity.id} activity={activity} />
    ));
  }

  render() {
    return (
      <Grid>
        <Row><AppHeader /></Row>
        <Row>
          <Col md={8}>View container</Col>
          <Col md={4}>
            <Panel>
              <ListGroup fill>
                {this.renderActivities()}
              </ListGroup>
            </Panel>
          </Col>
        </Row>
      </Grid>);
  }
}

App.PropTypes = {
  loading: PropTypes.bool,
  activities: PropTypes.array.isRequired,
};


/** @exports - return smart component App with bind to Activities collection
* This will create this.props.activities property on the component App
*/
export default createContainer(() => {
  const subscription = Meteor.subscribe('activities');
  const loading = !subscription.ready();
  const activities = Activities.find().fetch();

  return { loading, activities };
}, App);
