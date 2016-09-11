/** @file this an App layout definition
* The App is subscribed to the collection Activities using the
* meteor createContainer smart component wrapper
* acivities can be accessed as this.props.activities
*/

import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Header from './ui-components/Header';

/** @function - main layout of the page */
export const App = (children) => {
  const { mainView, sidePanel } = children;
  return (<Grid>
    <Row><Header /></Row>
    <Row>
      <Col md={8}>
        { mainView }
      </Col>
      <Col md={4}>
        { sidePanel }
      </Col>
    </Row>
  </Grid>);
};
