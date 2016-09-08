/** @file this an App layout definition
* The App is subscribed to the collection Activities using the
* meteor createContainer smart component wrapper
* acivities can be accessed as this.props.activities
*/


import React, { Component, PropTypes } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';


import AppHeader from './ui-components/App-header';
import AppSidePanel from './ui-components/App-side-panel';
import AppMainContainer from './ui-components/App-main-container';


/** @classdesc - main layout of the page, export will be done as a smart component*/
export default class App extends Component {

  render() {
    return (
      <Grid>
        <Row>{ this.props.header }</Row>
        <Row>
          <Col md={8}>
            { this.props.main }
          </Col>
          <Col md={4}>
            { this.props.sidebar }
          </Col>
        </Row>
      </Grid>);
  }
}

App.PropTypes = {
  header: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired,
  sidebar: PropTypes.object.isRequired,
};


FlowRouter.route('/', {
  action() {
    mount(App, {
      header: <AppHeader />,
      main: <AppMainContainer />,
      sidebar: <AppSidePanel /> });
  },
});
