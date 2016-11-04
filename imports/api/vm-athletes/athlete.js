import { max as d3max, min as d3min } from 'd3';

export const ATHLETE = {
  FTP: 270,
  Z5: 1.1,
  Z4: 0.9,
  Z2: 0.75,
  Z1: 0.55,
};


/** @returns - Power zones in Watts */
export const zonesValuesPower = (y) => ({
  anaerobic: d3max(y),
  threshold: ATHLETE.Z5 * ATHLETE.FTP,
  tempoStop: ATHLETE.Z4 * ATHLETE.FTP,
  tempoStart: ATHLETE.Z2 * ATHLETE.FTP,
  endurance: ATHLETE.Z1 * ATHLETE.FTP,
  recovery: 0,
});

/** @returns - Power zones in Watts */
export const zonesValuesHR = (y) => ({
  anaerobic: d3max(y),
  threshold: ATHLETE.Z5 * ATHLETE.FTP,
  tempoStop: ATHLETE.Z4 * ATHLETE.FTP,
  tempoStart: ATHLETE.Z2 * ATHLETE.FTP,
  endurance: ATHLETE.Z1 * ATHLETE.FTP,
  recovery: 0,
});


/** @returns - Power zones Offfets in range 0..100 */
export const zonesOffsetsPower = (y) => {
  const maxY = d3max(y);
  const minY = d3min(y);
  const rangeY = maxY - minY;
  const namedZones = zonesValuesPower(y);

  return {
    anaerobic: maxY - namedZones.anaerobic,
    threshold: ((maxY - namedZones.threshold) / rangeY) * 100,
    tempoStop: ((maxY - namedZones.tempoStop) / rangeY) * 100,
    tempoStart: ((maxY - namedZones.tempoStart) / rangeY) * 100,
    endurance: ((maxY - namedZones.endurance) / rangeY) * 100,
    recovery: 100,
  };
};


/** @returns - Power zones Offfets in range 0..100 */
export const zonesOffsetsHR = (y) => {
  const maxY = d3max(y);
  const minY = d3min(y);
  const rangeY = maxY - minY;
  const namedZones = zonesValuesHR(y);

  return {
    anaerobic: maxY - namedZones.anaerobic,
    threshold: ((maxY - namedZones.threshold) / rangeY) * 100,
    tempoStop: ((maxY - namedZones.tempoStop) / rangeY) * 100,
    tempoStart: ((maxY - namedZones.tempoStart) / rangeY) * 100,
    endurance: ((maxY - namedZones.endurance) / rangeY) * 100,
    recovery: 100,
  };
};
