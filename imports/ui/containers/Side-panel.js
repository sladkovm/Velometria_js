/** @file - Component to define the App level right side pannel */

/** @external - Meteor modules */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import Activity from '../components/Activity';
import { Loading } from '../components/Loading';
import { Activities } from '../../api/activities/activities';


Session.set('currentActive', undefined);


/** @class - View component for an App side pannel */
class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = { currentActive: Session.get('currentActive') };
    this.handleClick = this.handleClick.bind(this);
  }

  /** @method - Set the active state using Session global variable */
  handleClick() {
    this.setState({ currentActive: Session.get('currentActive')});
  }

  /** @method - convert fetched activities list into list of Activity components
  executeOnClick is a call back function that allows to update parent state, when
  action is performed on chiled component*/
  renderActivities() {
    const loading = this.props.loading;
    const activities = this.props.activities;
    return loading ? <Loading /> : activities.map((activity) => {
      const active = (activity._id === this.state.currentActive)
      return (
        <Activity
          key={activity._id}
          activity={activity}
          active={active}
        />
    );
    }, this);
  }

  render() {
    return (
      <Panel>
        <ListGroup fill onClick={this.handleClick}>
          {this.renderActivities()}
        </ListGroup>
      </Panel>
    );
  }
}

SidePanel.PropTypes = {
  loading: PropTypes.bool.isRequired,
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
}, SidePanel);
