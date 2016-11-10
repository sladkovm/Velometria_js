import React from 'react';
import { v4 } from 'uuid';


export const TickLabelsX = ({ ticks, tickLabels, xScale, chartProps }) => {
  const y0 = (chartProps.height - chartProps.bottomMargin) + chartProps.xAxisOffset;
  return (
    <g>
      {ticks.map((t, i) => (
        <text
          key={v4()}
          x={xScale(t)}
          y={y0 + chartProps.yTextOffset}
          textAnchor="middle"
        >
          {tickLabels[i]}
        </text>
      ))}
    </g>
  );
};

export const TickLabelsY = ({ ticks, tickLabels, yScale, chartProps }) => {
  const x0 = chartProps.leftMargin - chartProps.yAxisOffset - chartProps.histogramWidth;
  return (
    <g>
      {ticks.map((t, i) => (
        <text
          key={v4()}
          x={x0 - chartProps.xTextOffset}
          y={yScale(t) + chartProps.textAxisYoffset}
          textAnchor="end"
        >
          {tickLabels[i]}
        </text>
      ))}
    </g>
  );
};
