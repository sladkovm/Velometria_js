/** @file - Component to define the App level main container */


import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Activities } from '../../api/activities/activities';
import { Streams } from '../../api/streams/streams';
import { Loading } from '../components/Loading';
import { SimpleStreamsPlot } from '../d3-components/simple-streams-plot';


class ActivityView extends Component {
  render() {
    const _id = this.props.routeParams._id;
    const loading = this.props.loading;
    const activity = this.props.activity;
    const stream = this.props.stream;
    if (loading) {
      console.log('loading');
    } else {
      console.log(stream);
    }
    return loading ?
      <Loading /> :
      (<Panel>
        Acitivity View
        <p>Session: {Session.get('currentActive')}</p>
        <p>this.props.routeParams: {_id}</p>
        <p>{ activity.name }</p>
        <SimpleStreamsPlot />
      </Panel>);
  }
}


export default createContainer(({ params }) => {
  const { _id } = params;
  const activitySub = Meteor.subscribe('activities', _id);
  const activity = Activities.findOne(_id);
  const streamSub = Meteor.subscribe('streams', { activityId: activity.id });
  const stream = Streams.findOne({ activityId: activity.id });
  const loading = (!activitySub.ready()) || (!streamSub.ready());

  return { loading, activity, stream };
}, ActivityView);
