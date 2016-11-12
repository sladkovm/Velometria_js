/** @file - module to process Athlete data and return ready to visualise object*/

export const FTP = 270.0;

export const LTHR = 165.0;

export const getFtp = () => FTP;

export const getLthr = () => LTHR;

export const getRelPowerZones = () => ({
  anaerobic: 1.1,
  threshold: 0.9,
  tempo: 0.75,
  endurance: 0.55,
});

export const getRelHeartrateZones = () => ({
  anaerobic: 1.06,
  threshold: 1.0,
  tempo: 0.93,
  endurance: 0.81,
});

export const getAbsPowerZones = () => {
  const zones = getRelPowerZones();
  const ftp = getFtp();
  return {
    anaerobic: zones.anaerobic * ftp,
    threshold: zones.threshold * ftp,
    tempo: zones.tempo * ftp,
    endurance: zones.endurance * ftp,
  };
};

export const getAbsHeartrateZones = () => {
  const zones = getRelHeartrateZones();
  const lthr = getLthr();
  return {
    anaerobic: Math.round(zones.anaerobic * lthr),
    threshold: Math.round(zones.threshold * lthr),
    tempo: Math.round(zones.tempo * lthr),
    endurance: Math.round(zones.endurance * lthr),
  };
};
