import React from 'react';
import { v4 } from 'uuid';


export const TicksX = ({ ticks, xScale, chartProps }) => {
  const y1 = (chartProps.height - chartProps.bottomMargin) + chartProps.xAxisOffset;
  const y2 = y1 + chartProps.tickLength;
  return (
    <g>
      {ticks.map(t => (
        <line
          key={v4()}
          x1={xScale(t)}
          y1={y1}
          x2={xScale(t)}
          y2={y2}
          stroke="grey"
          strokeWidth="1px"
        />
      ))}
    </g>
  );
};


export const TicksY = ({ ticks, yScale, chartProps }) => {
  const x1 = chartProps.leftMargin - chartProps.yAxisOffset - chartProps.histogramWidth;
  const x2 = x1 - chartProps.tickLength;
  return (
    <g>
      {ticks.map(t => (
        <line
          key={v4()}
          x1={x1}
          y1={yScale(t)}
          x2={x2}
          y2={yScale(t)}
          stroke="grey"
          strokeWidth="1px"
        />
      ))}
    </g>
  );
};
