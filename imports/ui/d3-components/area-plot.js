import React from 'react';
import * as d3 from 'd3';
import { LinearGradient } from './linear-gradient.js';


const AreaPlot = ({ x, y, xScale, yScale, stroke = "black" }) => {
  const data = x.map((d, i) => Object.assign({}, { x: d, y: y[i] }));
  const area = d3.area()
          .y0(yScale(d3.min(y)))
          .x((d) => xScale(d.x))
          .y1((d) => yScale(d.y));
  return (
    <g>
      <defs>
        <LinearGradient y={y} />
      </defs>
      <path
        d={area(data)}
        stroke={stroke}
        fill="url(#MyGradient)"
      />
    </g>);
};

export default AreaPlot;
