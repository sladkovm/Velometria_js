import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import { v4 } from 'uuid';
import { COLORS_VEC } from '../../styles/colors.js';
import { getAbsPowerZones, getAbsHeartrateZones } from '../../../api/vm-athletes/vm-athlete.js';


/** @returns - number of bins to meet @param {double} - bin width */
export const calcNrBins = (data, binWidth) => {
  const min = d3.min(data);
  const max = d3.max(data);
  const minN = Math.round(min / binWidth);
  const maxN = Math.round(max / binWidth) + 1;
  const nBins = maxN - minN;
  return nBins;
};


export const dataVector = (type, data) => {
  if (type === 'watts') {
    return [d3.min(data), ..._.values(getAbsPowerZones()).reverse(), d3.max(data)];
  }
  if (type === 'heartrate') {
    return [d3.min(data), ..._.values(getAbsHeartrateZones()).reverse(), d3.max(data)];
  }
  return undefined;
};

export const HistogramY = ({ data, yScale, chartProps, type = 'watts', binWidth = 20 }) => {
  // Generate histogram object
  const nBins = calcNrBins(data, binWidth);
  const histogram = d3.histogram()
          .domain(yScale.domain())
          .thresholds(yScale.ticks(nBins));
  const bins = histogram(data);

  // Position of the histogram along X axis
  const x0 = chartProps.leftMargin - chartProps.histogramWidth;
  // Calculate length of each bin
  const binsLength = bins.map((bin) => bin.length);
  // xScale for histogram must be defined in terms of length of the bin
  const xScale = d3.scaleLinear()
                  .domain([d3.min(binsLength), d3.max(binsLength)])
                  .range([0, chartProps.histogramWidth - chartProps.histogramPadding]);

  // Generate color scale - color for each bin depending on the bin position
  const vec = dataVector(type, data);
  // console.log(powerVec)
  // console.log(COLORS_VEC)
  const colorScale = d3.scaleLinear()
            .domain(vec)
            .range(COLORS_VEC);
  return (
    <g>
      {bins.map((bin) => {
        const xPos = x0;
        const y0 = yScale(bin.x0);
        const y1 = yScale(bin.x1);
        const dy = y0 - y1;
        const yPos = y0 - dy;
        const width = xScale(bin.length);
        const height = dy;
        return (
          <rect
            key={v4()}
            x={xPos}
            y={yPos}
            width={width}
            height={height}
            fill={colorScale(bin.x0)}
          />
        );
      })}
    </g>
  );
};
