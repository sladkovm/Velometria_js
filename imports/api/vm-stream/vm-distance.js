import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';


export const vmDistance = (stream) => {
  if (!stream) return undefined;
  const type = stream.type;
  const data = stream.data.map(d => d / 1000);
  const min = d3min(data);
  const max = d3max(data);
  const ticks = [min,
                 max].map(t => Math.round(t));
  const scaleDomain = scaleLinear().domain([min, max].map(t => Math.round(t)));
  const tickLabels = ticks;
  return {
    type,
    min,
    max,
    data,
    ticks,
    tickLabels,
    scaleDomain,
  };
};
