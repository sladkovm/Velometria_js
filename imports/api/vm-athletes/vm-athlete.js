/** @file - module to process Athlete data and return ready to visualise object*/

export const FTP = 270.0;

export const LTHR = 165.0;

export const getFtp = () => FTP;

export const getLthr = () => LTHR;

export const getRelPowerZones = () => ({
  anaerobic: 1.1,
  threshold: 0.9,
  tempo: 0.75,
  endurance: 0.65,
  recovery: 0.55,
});

export const getRelHeartrateZones = () => ({
  anaerobic: 1.06,
  threshold: 1.0,
  tempo: 0.93,
  endurance: 0.81,
  recovery: 0.69,
});

export const getAbsPowerZones = () => {
  const zones = getRelPowerZones();
  const ftp = getFtp();
  return {
    anaerobic: zones.anaerobic * ftp,
    threshold: zones.threshold * ftp,
    tempo: zones.tempo * ftp,
    endurance: zones.endurance * ftp,
    recovery: zones.recovery * ftp,
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
    recovery: Math.round(zones.recovery * lthr),
  };
};


export const getCadenceZones = () => {
  return {
    high: 110,
    normal_max: 100,
    normal_min: 90,
    low: 70,
    very_low: 60,
  };
};
