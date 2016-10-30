import React from 'react';
import * as d3 from 'd3';
import { LinearGradient, powerOffsets } from './linear-gradient.js';
import { COLORS } from './colors.js';


const calcNrBins = (y, yWidth = 20) => {
  const minY = d3.min(y);
  const maxY = d3.max(y);
  const minN = Math.round(minY / yWidth);
  const maxN = Math.round(maxY / yWidth) + 1;
  const nTicks = maxN - minN;
  return nTicks;
};


export const HistogramY = ({ y, yScale, chartProps }) => {
  const x0 = chartProps.leftMargin - chartProps.histogramWidth;
  const nTicks = calcNrBins(y, 20);
  const histogram = d3.histogram()
          .domain(yScale.domain())
          .thresholds(yScale.ticks(nTicks));
  const bins = histogram(y);
  const binsLength = bins.map((bin) => bin.length);
  // xScale for histogram must be defined in terms of length of the bin
  const xScale = d3.scaleLinear()
                  .domain([d3.min(binsLength), d3.max(binsLength)])
                  .range([0, chartProps.histogramWidth - chartProps.histogramPadding]);

  console.log(powerOffsets(y))
  const colorScale = d3.scaleLinear()
            .domain(powerOffsets(y))
            .range([COLORS.red, COLORS.red, COLORS.grey, COLORS.grey, COLORS.skyblue, COLORS.white]);


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
        return <rect x={xPos} y={yPos} width={width} height={height} fill={colorScale(bin.x0)} />;
      })}
    </g>
  );
};