import React, { PropTypes } from 'react';
import { min as d3min, max as d3max } from 'd3';
import { scaleLinear as d3scaleLinear } from 'd3-scale';

import AreaPlot from '../generic/area-plot.js';
import LinePlot from './line-plot.js';
import { TickLabelsX, TickLabelsY } from '../generic/tick-labels.js';
import { TicksX, TicksY } from '../generic/ticks.js';
import { CHART_PROPS } from '../../styles/chart-props.js';
import { COLORS } from '../../styles/colors.js';


const getLine = (x, y, stroke = 'black') => {
  const minX = d3min(x);
  const maxX = d3max(x);
  const minY = d3min(y);
  const maxY = d3max(y);
  const xScale = d3scaleLinear()
          .domain([minX, maxX])
          .range([CHART_PROPS.leftMargin, CHART_PROPS.width - CHART_PROPS.rightMargin]);
  const yScale = d3scaleLinear()
          .domain([minY, maxY])
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);
  return (
    <LinePlot
      x={x}
      y={y}
      xScale={xScale}
      yScale={yScale}
      stroke={stroke}
    />
  );
};


const getArea = (x, y, stroke = 'none') => {
  const minX = d3min(x);
  const maxX = d3max(x);
  const minY = d3min(y);
  const maxY = d3max(y);
  const xScale = d3scaleLinear()
          .domain([minX, maxX])
          .range([CHART_PROPS.leftMargin, CHART_PROPS.width - CHART_PROPS.rightMargin]);
  const yScale = d3scaleLinear()
          .domain([minY, maxY])
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);
  return (
    <AreaPlot
      xArray={x}
      yArray={y}
      xScale={xScale}
      yScale={yScale}
      stroke={stroke}
    />
  );
};


const SpeedPlot = ({ altitude, speed, cadence, distance }) => {
  const minSpeed = d3min(speed);
  const maxSpeed = d3max(speed);

  const minDistance = d3min(distance);
  const maxDistance = d3max(distance);

  const xScale = d3scaleLinear()
          .domain([minDistance, maxDistance])
          .range([CHART_PROPS.leftMargin, CHART_PROPS.width - CHART_PROPS.rightMargin]);

  const yScale = d3scaleLinear()
          .domain([minSpeed, maxSpeed])
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);

  const ticksX = [minDistance, maxDistance];

  const ticksY = [minSpeed, maxSpeed];

  return (
    <div>
      <svg width={CHART_PROPS.width} height={CHART_PROPS.height}>
        {getArea(distance, altitude)}
        {getLine(distance, speed, COLORS.blue)}
        {getLine(distance, cadence, COLORS.red)}
        <TicksX
          ticks={ticksX}
          xScale={xScale}
          chartProps={CHART_PROPS}
        />
        <TicksY
          ticks={ticksY}
          yScale={yScale}
          chartProps={CHART_PROPS}
        />
        <TickLabelsX
          ticks={ticksX}
          tickLabels={ticksX.map(t => Math.round(t / 1000))}
          xScale={xScale}
          chartProps={CHART_PROPS}
        />
        <TickLabelsY
          ticks={ticksY}
          tickLabels={ticksY.map(t => Math.round(t))}
          yScale={yScale}
          chartProps={CHART_PROPS}
        />
      </svg>
    </div>
  );
};

SpeedPlot.propTypes = {
  altitude: PropTypes.array,
  speed: PropTypes.array,
  cadence: PropTypes.array,
  distance: PropTypes.array,
};

export default SpeedPlot;
