/** @file - Component to define the App level main container */

/** @external - Meteor modules */
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

/** @external - React modules */
import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

/** @external - import Activities collection to subscribe to */
import { Activities } from '../../api/activities';
import { Streams } from '../../api/streams';

/** @external - App components */
import { Loading } from './Loading';


/** @class - Main view contaner of the App */
class ActivityView extends Component {

  render() {
    const _id = this.props.routeParams._id;
    const loading = this.props.loading;
    const activity = this.props.activity;
    const stream = this.props.stream;
    loading ? console.log('loading') : console.log(stream)
    return loading ? <Loading /> :
      (<Panel>
        Acitivity View
        <p>Session: {Session.get('currentActive')}</p>
        <p>this.props.routeParams: {_id}</p>
        <p>{ activity.name }</p>
      </Panel>);
  }
}

/** @exports - return smart component App with bind to Activities collection
* This will create this.props.activities property on the component App
*/
export default createContainer(({ params }) => {
  const { _id } = params;
  const activitySub = Meteor.subscribe('activities', _id);
  const activity = Activities.findOne(_id);
  const streamSub = Meteor.subscribe('streams', { activityId: activity.id });
  const stream = Streams.findOne({ activityId: activity.id });
  const loading = (!activitySub.ready()) || (!streamSub.ready());

  return { loading, activity, stream };
}, ActivityView);
