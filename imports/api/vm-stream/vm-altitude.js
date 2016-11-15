import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';


export const vmAltitude = (stream) => {
  if (!stream) return undefined;
  const type = stream.type;
  const data = stream.data;
  const min = d3min(data);
  const max = d3max(data);
  const ticks = [min, max].map(t => Math.round(t));
  const tickLabels = ticks;
  const scaleDomain = scaleLinear().domain([min, max].map(t => Math.round(t)));

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
