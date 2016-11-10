import React, { PropTypes } from 'react';
import * as d3 from 'd3';

import AreaPlot from '../generic/area-plot.js';
import { TickLabelsX, TickLabelsY } from '../generic/tick-labels.js';
import { TicksX, TicksY } from '../generic/ticks.js';
import { HistogramY } from './histogram.js';

import { CHART_PROPS } from '../../styles/chart-props.js';

import * as vmWatts from '../../../api/vm-streams/vm-watts';
import * as vmDistance from '../../../api/vm-streams/vm-distance';


const PowerPlot = ({ watts, distance }) => {
  const power = vmWatts.watts(watts);
  const yScale = power.yScaleDomain
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);

  const dist = vmDistance.distance(distance);
  const xScale = dist.xScaleDomain
          .range([CHART_PROPS.leftMargin, CHART_PROPS.width - CHART_PROPS.rightMargin]);

  return (
    <div>
      <svg width={CHART_PROPS.width} height={CHART_PROPS.height}>
        <AreaPlot
          xArray={dist.data}
          yArray={power.data}
          xScale={xScale}
          yScale={yScale}
          stroke="none"
          gradient
        />
        <TicksX
          ticks={dist.ticks}
          xScale={xScale}
          chartProps={CHART_PROPS}
        />
        <TicksY
          ticks={power.ticks}
          yScale={yScale}
          chartProps={CHART_PROPS}
        />
        <TickLabelsX
          ticks={dist.ticks}
          tickLabels={dist.ticksLabels}
          xScale={xScale}
          chartProps={CHART_PROPS}
        />
        <TickLabelsY
          ticks={power.ticks}
          tickLabels={power.ticks}
          yScale={yScale}
          chartProps={CHART_PROPS}
        />
        <HistogramY
          y={power.data}
          yScale={yScale}
          chartProps={CHART_PROPS}
        />
      </svg>
    </div>
  );
};

PowerPlot.propTypes = {
  watts: PropTypes.array,
  distance: PropTypes.array,
};

export default PowerPlot;
