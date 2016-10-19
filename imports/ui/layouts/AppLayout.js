/** @file this an App layout definition */


import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Header from '../components/Header';


const AppLayout = (children) => {
  const { mainView, sidePanel } = children;
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
};

export default AppLayout;
