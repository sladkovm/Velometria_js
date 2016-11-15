import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';


// Convert m/s to km/h
export const mps2kph = (data) => {
  if (typeof data === 'number') return data * 3.6;
  return data.map(d => d * 3.6);
};


export const vmSpeed = (stream) => {
  if (!stream) return undefined;
  const type = stream.type;
  const data = mps2kph(stream.data);
  const min = d3min(data);
  const max = d3max(data);
  const ticks = [min, max].map(t => Math.round(t));
  const tickLabels = ticks;
  const scaleDomain = scaleLinear().domain([min, max]);

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
