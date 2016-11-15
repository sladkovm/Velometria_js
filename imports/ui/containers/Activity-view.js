/** @file - Component to define the App level main container */


import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { vmWatts } from '../../api/vm-stream/vm-watts';
import { vmHeartrate } from '../../api/vm-stream/vm-heartrate';
import { vmDistance } from '../../api/vm-stream/vm-distance';
import { vmAltitude } from '../../api/vm-stream/vm-altitude';
import { vmCadence } from '../../api/vm-stream/vm-cadence';
import { vmSpeed } from '../../api/vm-stream/vm-speed';
import { getAbsPowerZones, getAbsHeartrateZones } from '../../api/vm-athletes/vm-athlete';
import PowerPlot from '../d3-components/streams-plot/power-plot';
import HeartratePlot from '../d3-components/streams-plot/heartrate-plot';
import SpeedPlot from '../d3-components/streams-plot/speed-plot';
import EmptyPlot from '../d3-components/streams-plot/empty-plot';
// import SpeedPlot from '../d3-components/streams-plot/speed-plot';

/** @returns object with key = stream_name*/
export const objectifyStream = (stream) => (
  _.mapKeys(stream, (value, key) => {
    if (value.type) return value.type;
    return key;
  })
);

export const renderHeader = (id, activity) => {
  if (!activity) return <h2>{id}</h2>;
  return (
    <Panel>
      Activity View
      <h2>{id}</h2>
      <h2>{activity.name}</h2>
    </Panel>
  );
};


export const renderPower = (xData, yData) => {
  if (!xData | !yData) return <EmptyPlot />;
  return (
    <PowerPlot
      xData={xData}
      yData={yData}
    />
  );
};


export const renderHeartrate = (xData, yData) => {
  if (!xData | !yData) return <EmptyPlot />;
  return (
    <HeartratePlot
      xData={xData}
      yData={yData}
    />
  );
};


export const renderSpeed = (xData, altitude, speed, cadence) => {
  if (!xData | !altitude | !speed | !cadence) return <EmptyPlot />;
  return (
    <SpeedPlot
      xData={xData}
      altitude={altitude}
      speed={speed}
      cadence={cadence}
    />
  );
};

export const renderStream = (id, stream) => {
  if (!stream) return <h2>Loading {id}</h2>;
  const streamObject = objectifyStream(stream);
  const powerData = vmWatts(streamObject.watts, getAbsPowerZones());
  const heartrateData = vmHeartrate(streamObject.heartrate, getAbsHeartrateZones());
  const distanceData = vmDistance(streamObject.distance);
  const speedData = vmSpeed(streamObject.velocity_smooth);
  const altitudeData = vmAltitude(streamObject.altitude);
  const cadenceData = vmCadence(streamObject.cadence);
  return (
    <div>
      {renderPower(distanceData, powerData)}
      {renderHeartrate(distanceData, heartrateData)}
      {renderSpeed(distanceData, altitudeData, speedData, cadenceData)}
    </div>
  );
};


// The actual activiies data will be received via store
export const ActivityView = ({ id, activity, stream }) => {
  return (
    <div>
      {renderHeader(id, activity)}
      {renderStream(id, stream)}
    </div>
  );
};


export const mapStateToProps = (state, ownProps) => {
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
