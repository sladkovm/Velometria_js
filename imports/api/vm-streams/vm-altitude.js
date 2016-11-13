import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';


export const vmAltitude = (stream) => {
  if (!stream) return undefined;
  const data = stream;
  const min = d3min(data);
  const max = d3max(data);
  const ticks = [min, max].map(t => Math.round(t));
  const tickLabels = ticks;
  const scaleDomain = scaleLinear().domain([min, max]);

  return {
    min,
    max,
    data,
    ticks,
    tickLabels,
    scaleDomain,
  };
};
