import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';
import { _ } from 'lodash';
import { COLORS_VEC } from '../../ui/styles/colors';


export const getStopColors = (data, zones, colors = COLORS_VEC) => {
  const max = d3max(data);
  const min = d3min(data);
  const range = max - min;
  const offsets = [
    100,
    Math.round(100 * (1 - (max - zones.anaerobic) / range)),
    Math.round(100 * (1 - (max - zones.threshold) / range)),
    Math.round(100 * (1 - (max - zones.tempo) / range)),
    Math.round(100 * (1 - (max - zones.endurance) / range)),
    Math.round(100 * (1 - (max - zones.recovery) / range)),
    0].reverse();
  return _.zipWith(offsets, colors, (o, c) => ({ offset: o, stopColor: c }));
};


export const vmHeartrate = (stream, zones, colors = COLORS_VEC) => {
  if (!stream) return undefined;
  const type = stream.type;
  const data = stream.data;
  const min = d3min(data);
  const max = d3max(data);
  const scaleDomain = scaleLinear().domain([min, max]);
  const ticks = [min,
                  zones.endurance,
                  zones.tempo,
                  zones.threshold,
                  zones.anaerobic,
                  max].map(t => Math.round(t));
  const tickLabels = ticks;
  const stopColors = getStopColors(stream.data, zones, colors);
  return {
    type,
    min,
    max,
    data,
    ticks,
    tickLabels,
    scaleDomain,
    stopColors,
  };
};
