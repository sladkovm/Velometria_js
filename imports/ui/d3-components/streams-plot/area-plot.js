/** @file - Area plot for power or heart rate data
* @param {array} xArray - numerical array of data for horizontal axis in natural units
* @param {array} yArray - numerical array of data for vertical axis in natural units
* @param {Object} xScale, yScale - d3.scaleLinear or d3.scaleTime object
* @param {string} valueType - 'watts', 'heartrate' ...
* @param {string} stroke - [optional] stroke property, default stroke = "black"
*/

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
  valueType = 'watts',
  gradient = false,
  stroke = 'black',
}) => {
  // map input arrays into array of objects [{x: value, y: value}]
  const data = _.zipWith(xArray, yArray, (x, y) => ({ x, y }));
  // create d3 axis component
  const area = d3area()
          .y0(yScale(d3min(yArray)))
          .x((d) => xScale(d.x))
          .y1((d) => yScale(d.y));
  // process gradient data
  const fill = gradient ? `url(#${valueType}Gradient)` : 'grey';
  return (
    <g>
      <defs>
        <ValueGradient y={yArray} valueType={valueType} />
      </defs>
      <path
        d={area(data)}
        stroke={stroke}
        fill={fill}
      />
    </g>);
};

export default AreaPlot;
