/** @file - Component to define the App level main container */


import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { vmWatts } from '../../api/vm-streams/vm-watts';
import { vmDistance } from '../../api/vm-streams/vm-distance';
import { getAbsPowerZones } from '../../api/vm-athletes/vm-athlete';
import PowerPlot from '../d3-components/streams-plot/power-plot';
// import SpeedPlot from '../d3-components/streams-plot/speed-plot';

/** @returns object with key = stream_name*/
const objectifyStream = (stream) => (
  _.mapKeys(stream, (value, key) => {
    if (value.type) return value.type;
    return key;
  })
);

const renderHeader = (id, activity) => {
  if (!activity) return <h2>{id}</h2>;
  return (
    <Panel>
      Activity View
      <h2>{id}</h2>
      <h2>{activity.name}</h2>
    </Panel>
  );
};


const renderPower = (xData, yData) => {
  return (
    <PowerPlot
      xData={xData}
      yData={yData}
    />
  );
};


// const renderSpeed = () => {
//   return (
//     <SpeedPlot
//       altitude={streamObject.altitude.data}
//       speed={streamObject.velocity_smooth.data}
//       cadence={streamObject.cadence.data}
//       distance={streamObject.distance.data}
//     />
//   );
// };

const renderStream = (id, stream) => {
  if (!stream) return <h2>Loading {id}</h2>;
  const streamObject = objectifyStream(stream);
  const powerData = vmWatts(streamObject.watts.data, getAbsPowerZones());
  const distanceData = vmDistance(streamObject.distance.data);
  return (
    <div>
      {renderPower(distanceData, powerData)}
    </div>
  );
};


// The actual activiies data will be received via store
const ActivityView = ({ id, activity, stream }) => {
  return (
    <div>
      {renderHeader(id, activity)}
      {renderStream(id, stream)}
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
