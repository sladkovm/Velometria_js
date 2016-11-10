import React from 'react';
import { v4 } from 'uuid';


export const TicksX = ({ ticks, xScale, chartProps }) => {
  const y0 = (chartProps.height - chartProps.bottomMargin) + chartProps.xAxisOffset;
  return (
    <g>
      {ticks.map(t => (
        <line
          key={v4()}
          x1={xScale(t)}
          y1={y0}
          x2={xScale(t)}
          y2={y0 + chartProps.tickLength}
          stroke="grey"
          strokeWidth="1px"
        />
      ))}
    </g>
  );
};


export const TicksY = ({ ticks, yScale, chartProps }) => {
  const x0 = chartProps.leftMargin - chartProps.yAxisOffset - chartProps.histogramWidth;
  console.log(ticks);
  return (
    <g>
      {ticks.map(t => (
        <line
          key={v4()}
          x1={x0}
          y1={yScale(t)}
          x2={x0 - chartProps.tickLength}
          y2={yScale(t)}
          stroke="grey"
          strokeWidth="1px"
        />
      ))}
    </g>
  );
};
