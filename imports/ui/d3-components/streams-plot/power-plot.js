import React from 'react';

import AreaPlot from '../generic/area-plot.js';
import { TickLabelsX, TickLabelsY } from '../generic/tick-labels.js';
import { TicksX, TicksY } from '../generic/ticks.js';
import { HistogramY } from './histogram.js';
//
import { CHART_PROPS } from '../../styles/chart-props.js';


const PowerPlot = ({ xData, yData }) => {
  const xScale = xData.scaleDomain
          .range([CHART_PROPS.leftMargin, CHART_PROPS.width - CHART_PROPS.rightMargin]);

  const yScale = yData.scaleDomain
          .range([CHART_PROPS.height - CHART_PROPS.bottomMargin, CHART_PROPS.topMargin]);

  return (
    <svg width={CHART_PROPS.width} height={CHART_PROPS.height}>
      <AreaPlot
        xArray={xData.data}
        yArray={yData.data}
        xScale={xScale}
        yScale={yScale}
        gradient
        stopColors={yData.stopColors}
        stroke='none'
      />
      <TicksX
        ticks={xData.ticks}
        xScale={xScale}
        chartProps={CHART_PROPS}
      />
      <TicksY
        ticks={yData.ticks}
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
        ticks={yData.ticks}
        tickLabels={yData.tickLabels}
        yScale={yScale}
        chartProps={CHART_PROPS}
      />
      {/* <HistogramY
        y={yData.data}
        yScale={yScale}
        chartProps={CHART_PROPS}
      /> */}
    </svg>
  );
};


export default PowerPlot;
