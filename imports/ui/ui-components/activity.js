/**
* @file - React component for Activities list
*/

import React, { Component, PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';

export default class Activity extends Component {
  render() {
    return (<ListGroupItem>{this.props.activity.name}</ListGroupItem>);
  }
}

Activity.PropTypes = {
  activity: PropTypes.object.isRequired,
};
