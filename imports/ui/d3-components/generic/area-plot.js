/** @file - Area plot for power or heart rate data */

import React from 'react';
import { min as d3min } from 'd3';
import { area as d3area } from 'd3-shape';
import _ from 'lodash';
import { ValueGradient } from '../generic/value-gradient.js';


const AreaPlot = ({
  xArray,
  yArray,
  xScale,
  yScale,
  stopColors,
  gradient = false,
  shadeColor = 'grey',
  stroke = 'black',
}) => {
  // map input arrays into array of objects [{x: value, y: value}]
  const data = _.zipWith(xArray, yArray, (x, y) => ({ x, y }));
  // create d3 area component
  const area = d3area()
          .y0(yScale(d3min(yArray)))
          .x((d) => xScale(d.x))
          .y1((d) => yScale(d.y));
  // process gradient data
  // console.log(xScale.range())
  // console.log(yScale.range())
  const fill = gradient ? 'url(#value-gradient-id)' : shadeColor;
  return (
    <g>
      <defs>
        <ValueGradient
          stopColors={stopColors}
          id={'value-gradient-id'}
          scale={yScale}
        />
      </defs>
      <path
        d={area(data)}
        stroke={stroke}
        fill={fill}
      />
    </g>);
};

export default AreaPlot;
