import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';
import { absPowerZones, ftp, relPowerZones } from '../vm-athletes/vm-athlete.js';

export const watts = (data) => {
  if (!data) return undefined;
  const min = d3min(data);
  const max = d3max(data);
  const yScaleDomain = scaleLinear().domain([min, max]);
  const zonesPower = absPowerZones(ftp, relPowerZones);
  const ticks = [min,
                  zonesPower.endurance,
                  zonesPower.tempo,
                  zonesPower.threshold,
                  zonesPower.anaerobic,
                  max];
  return {
    min,
    max,
    data,
    ticks: ticks.map(t => Math.round(t)),
    yScaleDomain,
  };
};
