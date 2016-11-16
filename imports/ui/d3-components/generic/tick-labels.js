import React from 'react';
import { v4 } from 'uuid';


export const TickLabelsX = ({ ticks, tickLabels, xScale, chartProps }) => {
  const y0 = (chartProps.height - chartProps.bottomMargin)
              + chartProps.xAxisOffset + chartProps.yTextOffset;
  return (
    <g>
      {ticks.map((t, i) => (
        <text
          key={v4()}
          x={xScale(t)}
          y={y0}
          textAnchor="middle"
          style={{
            fill: 'grey',
          }}
        >
          {tickLabels[i]}
        </text>
      ))}
    </g>
  );
};

export const TickLabelsY = ({ ticks, tickLabels, yScale, chartProps }) => {
  const x0 = chartProps.leftMargin - chartProps.yAxisOffset
            - chartProps.histogramWidth - chartProps.xTextOffset;
  return (
    <g>
      {ticks.map((t, i) => (
        <text
          key={v4()}
          x={x0}
          y={yScale(t) + chartProps.textAxisYoffset}
          textAnchor="end"
          style={{
            fill: 'grey',
          }}
        >
          {tickLabels[i]}
        </text>
      ))}
    </g>
  );
};
