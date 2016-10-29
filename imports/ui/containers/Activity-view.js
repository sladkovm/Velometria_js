/** @file - Component to define the App level main container */


import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SimpleStreamsPlot } from '../d3-components/simple-streams-plot';


const renderPower = (stream) => {
  return stream[4].data.map(d => d);
};

const renderDistance = (stream) => {
  return stream[1].data.map(d => d);
};

// The actual activiies data will be received via store
const ActivityView = ({ params, id, activity, stream }) => {
  console.log(stream);
  return (
    <div>
    {
      !activity ?
        <div>{id}</div> :
        <Panel>
          Activity View
          <h2>{params.id}</h2>
          <h2>{activity.name}</h2>
        </Panel>
    }
    {!stream ?
      <p>Loading stream</p> :
      <div>
        <SimpleStreamsPlot
          watts={renderPower(stream)}
          distance={renderDistance(stream)}
        />
      </div>
    }
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.params.id;
  const activity = state.activities.byId[id];
  const stream = state.streams.byId[id];
  // console.log(id, activity);
  return {
    activity,
    stream,
    id,
  };
};
export default connect(mapStateToProps)(ActivityView);
