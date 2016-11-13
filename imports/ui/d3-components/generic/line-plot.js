import React from 'react';
import { _ } from 'lodash';
import * as d3 from 'd3';


const LinePlot = ({
  xArray,
  yArray,
  xScale,
  yScale,
  stroke = 'black',
}) => {
  const data = xArray.map((d, i) => Object.assign({}, { x: d, y: yArray[i] }));
  const line = d3.line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y));
  return (
    <path
      d={line(data)}
      stroke={stroke}
      fill="none"
    />);
};

export default LinePlot;
