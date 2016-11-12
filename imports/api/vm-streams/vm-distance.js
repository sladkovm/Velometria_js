import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';


export const vmDistance = (stream) => {
  if (!stream) return undefined;
  const data = stream.map(d => d / 1000);
  const min = d3min(data);
  const max = d3max(data);
  const scaleDomain = scaleLinear().domain([min, max]);
  const ticks = [min,
                 max];
  const tickLabels = ticks.map(t => Math.round(t));
  return {
    min,
    max,
    data,
    ticks,
    tickLabels,
    scaleDomain,
  };
};
