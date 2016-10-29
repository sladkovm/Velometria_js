import React from 'react';
import * as d3 from 'd3';


const LinePlot = ({ x, y, xScale, yScale, stroke = "black" }) => {
  const data = x.map((d, i) => Object.assign({}, { x: d, y: y[i] }));
  const line = d3.line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y));
  return (
    <g>
      <path
        d={line(data)}
        stroke={stroke}
        fill="none"
      />
    </g>);
};

export default LinePlot;
