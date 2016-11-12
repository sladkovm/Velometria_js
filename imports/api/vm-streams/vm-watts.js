import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';
import { _ } from 'lodash';
import { COLORS_VEC } from '../../ui/styles/colors';


export const getStopColors = (stream, zones, colors = COLORS_VEC) => {
  const max = d3max(stream);
  const min = d3min(stream);
  const range = max - min;
  const offsets = [
    100,
    Math.round(100 * (1 - (max - zones.anaerobic) / range)),
    Math.round(100 * (1 - (max - zones.threshold) / range)),
    Math.round(100 * (1 - (max - zones.tempo) / range)),
    Math.round(100 * (1 - (max - zones.endurance) / range)),
    0].reverse();
  return _.zipWith(offsets, colors, (o, c) => ({ offset: o, stopColor: c }));
};


export const vmWatts = (stream, zones, colors = COLORS_VEC) => {
  if (!stream) return undefined;
  const min = d3min(stream);
  const max = d3max(stream);
  const scaleDomain = scaleLinear().domain([min, max]);
  const ticks = [min,
                  zones.endurance,
                  zones.tempo,
                  zones.threshold,
                  zones.anaerobic,
                  max].map(t => Math.round(t));
  const tickLabels = ticks;
  const stopColors = getStopColors(stream, zones, colors);
  return {
    min,
    max,
    data: stream,
    ticks,
    tickLabels,
    scaleDomain,
    stopColors,
  };
};
