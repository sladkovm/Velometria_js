/**
* @file - React component for Activities list
*/

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';


export default class Activity extends Component {
  handleClick(_id) {
    Session.set( 'currentActive', _id);
    // Meteor.call('fetchAndUpdateStream', _id)
  }

  render() {
    const _id = this.props.activity._id;
    return (
      <Link
        to={`/activity/${_id}`}
        activeClassName="active"
      >
        <ListGroupItem
          active={this.props.active}
          onClick={() => this.handleClick(_id)}
        >
          {this.props.activity.name}
        </ListGroupItem>
      </Link>);
  }
}

Activity.PropTypes = {
  activity: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  executeOnClick: PropTypes.func.isRequired,
};
