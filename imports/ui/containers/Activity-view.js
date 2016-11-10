/** @file - Component to define the App level main container */


import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import PowerPlot from '../d3-components/streams-plot/power-plot';
import SpeedPlot from '../d3-components/streams-plot/speed-plot';

/** @returns object with key = stream_name*/
const reformatStream = (stream) => (
  _.mapKeys(stream, (value, key) => {
    if (value.type) return value.type;
    return key;
  })
);

// The actual activiies data will be received via store
const ActivityView = ({ params, id, activity, stream }) => {
  const data = reformatStream(stream);
  // console.log(data.altitude.data);
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
        <SpeedPlot
          altitude={data.altitude.data}
          speed={data.velocity_smooth.data}
          cadence={data.cadence.data}
          distance={data.distance.data}
        />
        <PowerPlot
          watts={data.watts.data}
          distance={data.distance.data}
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
