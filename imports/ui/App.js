/** @file this an App layout definition
* The App is subscribed to the collection Activities using the
* meteor createContainer smart component wrapper
* acivities can be accessed as this.props.activities
*/


import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import AppHeader from './ui-components/App-header';
import AppSidePanel from './ui-components/App-side-panel';
import AppMainContainer from './ui-components/App-main-container';


/** @classdesc - main layout of the page, export will be done as a smart component*/
export default class App extends Component {

  render() {
    return (
      <Grid>
        <Row><AppHeader /></Row>
        <Row>
          <Col md={8}>
            <AppMainContainer />
          </Col>
          <Col md={4}>
            <AppSidePanel />
          </Col>
        </Row>
      </Grid>);
  }
}
