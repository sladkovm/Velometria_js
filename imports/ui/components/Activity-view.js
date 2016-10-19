/** @file - Component to define the App level main container */


import React from 'react';
import { Panel } from 'react-bootstrap';
import { SimpleStreamsPlot } from '../d3-components/simple-streams-plot';


// The actual activiies data will be received via store
const ActivityView = ({ params }) => (
  <Panel>
    Activity View
    <h2>{params.id}</h2>
    <SimpleStreamsPlot />
  </Panel>
);


export default ActivityView;
