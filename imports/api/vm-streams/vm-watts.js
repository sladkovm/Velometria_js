import { min as d3min, max as d3max } from 'd3';
import { scaleLinear } from 'd3-scale';
import { absPowerZones, ftp, relPowerZones } from '../vm-athletes/vm-athlete.js';


/** @returns - Power zones Offfets in range 0..100 */
const power2offsets = (data) => {
  const max = d3max(data);
  const min = d3min(data);
  const range = max - min;
  const zones = absPowerZones(ftp, relPowerZones);
  return {
    max: 100,
    anaerobic: 100 * (1 - (max - zones.anaerobic) / range),
    threshold: 100 * (1 - (max - zones.threshold) / range),
    tempo: 100 * (1 - (max - zones.tempo) / range),
    endurance: 100 * (1 - (max - zones.endurance) / range),
    min: 0,
  };
};


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
