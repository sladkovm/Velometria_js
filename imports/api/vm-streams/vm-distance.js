import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';


export const distance = (inData) => {
  if (!inData) return undefined;
  const data = inData.map(d => d / 1000);
  const min = d3min(data);
  const max = d3max(data);
  const xScaleDomain = scaleLinear().domain([min, max]);
  const ticks = [min,
                 max];

  return {
    min,
    max,
    data,
    ticks,
    ticksLabels: ticks.map(t => Math.round(t)),
    xScaleDomain,
  };
};
