import React from 'react';

import AreaPlot from '../generic/area-plot.js';
import LinePlot from '../generic/line-plot.js';
import { HistogramY } from '../generic/histogram';
import { TickLabelsX, TickLabelsY } from '../generic/tick-labels.js';
import { TicksX, TicksY } from '../generic/ticks.js';
import { CHART_PROPS } from '../../styles/chart-props.js';
import { COLORS } from '../../styles/colors.js';


export const renderLine = (xData, yData, stroke = 'black') => {
  const xScale = xData.scaleDomain
          .range([CHART_PROPS.leftMargin, CHART_PROPS.width - CHART_PROPS.rightMargin]);
  const yScale = yData.scaleDomain
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);
  return (
    <LinePlot
      xArray={xData.data}
      yArray={yData.data}
      xScale={xScale}
      yScale={yScale}
      stroke={stroke}
    />
  );
};


export const renderArea = (xData, yData, stroke = 'none') => {
  const xScale = xData.scaleDomain
          .range([CHART_PROPS.leftMargin, CHART_PROPS.width - CHART_PROPS.rightMargin]);
  const yScale = yData.scaleDomain
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);
  return (
    <AreaPlot
      xArray={xData.data}
      yArray={yData.data}
      xScale={xScale}
      yScale={yScale}
      stroke={stroke}
      shadeColor={COLORS.grey}
    />
  );
};


export const renderHistogram = (yData) => {
  const yScale = yData.scaleDomain
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);
  return (
    <HistogramY
      data={yData.data}
      yScale={yScale}
      chartProps={CHART_PROPS}
      binWidth={5}
    />);
};


const SpeedPlot = ({ xData, altitude, speed, cadence }) => {
  const xScale = xData.scaleDomain
          .range([CHART_PROPS.leftMargin, CHART_PROPS.width - CHART_PROPS.rightMargin]);

  const yScale = speed.scaleDomain
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);

  return (
    <svg width={CHART_PROPS.width} height={CHART_PROPS.height}>
      {renderArea(xData, altitude)}
      {renderLine(xData, speed, COLORS.blue)}
      {renderLine(xData, cadence, COLORS.red)}
      {renderHistogram(cadence)}
      <TicksX
        ticks={xData.ticks}
        xScale={xScale}
        chartProps={CHART_PROPS}
      />
      <TicksY
        ticks={speed.ticks}
        yScale={yScale}
        chartProps={CHART_PROPS}
      />
      <TickLabelsX
        ticks={xData.ticks}
        tickLabels={xData.tickLabels}
        xScale={xScale}
        chartProps={CHART_PROPS}
      />
      <TickLabelsY
        ticks={speed.ticks}
        tickLabels={speed.tickLabels}
        yScale={yScale}
        chartProps={CHART_PROPS}
      />
    </svg>
  );
};


export default SpeedPlot;
