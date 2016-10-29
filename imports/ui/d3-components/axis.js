import React from 'react';
import * as d3 from 'd3';

export const AxisX = ({ ticks, xScale, chartProps }) => {
  const y0 = (chartProps.height - chartProps.bottomMargin) + chartProps.xAxisOffset;
  return (
    <g>
      <line
        x1={xScale(d3.min(ticks))}
        y1={y0}
        x2={xScale(d3.max(ticks))}
        y2={y0}
        stroke="grey"
        strokeWidth="1px"
      />
      {ticks.map(t => (
        <text
          x={xScale(t)}
          y={y0 + chartProps.yTextOffset}
          textAnchor="middle"
        >
          {t}
        </text>
      ))}
      {ticks.map(t => (
        <line
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


export const AxisY = ({ ticks, yScale, chartProps }) => {
  const x0 = chartProps.leftMargin - chartProps.yAxisOffset;
  const dY = 5; // Text offset in pixels
  return (
    <g>
      <line
        x1={x0}
        y1={yScale(d3.max(ticks))}
        x2={x0}
        y2={yScale(d3.min(ticks))}
        stroke="grey"
        strokeWidth="1px"
      />
      {ticks.map(t => (
        <text
          x={x0 - chartProps.xTextOffset}
          y={yScale(t) + dY}
          textAnchor="end"
        >
          {t}
        </text>
      ))}
      {ticks.map(t => (
        <line
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
