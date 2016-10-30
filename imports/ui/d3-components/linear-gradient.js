import React from 'react';
import * as d3 from 'd3';
import { COLORS } from './colors.js';
import { ATHLETE } from './athlete.js';

export const numericOffsets = (y) => {
  const maxY = d3.max(y);
  const minY = d3.min(y);
  const rangeY = maxY - minY;
  const inRed = 0;
  const threshold = ((maxY - ATHLETE.Z5 * ATHLETE.FTP) / rangeY) * 100;
  const tempoStop = ((maxY - ATHLETE.Z4 * ATHLETE.FTP) / rangeY) * 100;
  const tempoStart = ((maxY - ATHLETE.Z2 * ATHLETE.FTP) / rangeY) * 100;
  const inBlue = ((maxY - ATHLETE.Z1 * ATHLETE.FTP) / rangeY) * 100;
  const recovery = 100;

  return {
    inRed,
    threshold,
    tempoStop,
    tempoStart,
    inBlue,
    recovery,
  };
};

export const powerOffsets = (y) => {
  const maxY = d3.max(y);
  const inRed = maxY;
  const threshold = ATHLETE.Z5 * ATHLETE.FTP;
  const tempoStop = ATHLETE.Z4 * ATHLETE.FTP;
  const tempoStart = ATHLETE.Z2 * ATHLETE.FTP;
  const inBlue = ATHLETE.Z1 * ATHLETE.FTP;
  const recovery = 0;

  return [
    inRed,
    threshold,
    tempoStop,
    tempoStart,
    inBlue,
    recovery,
  ];
};


export const LinearGradient = ({ y }) => {
  const nOffsets = numericOffsets(y);
  const stringOffset = {
    inRed: `${nOffsets.inRed}%`,
    threshold: `${nOffsets.threshold}%`,
    tempoStart: `${nOffsets.tempoStop}%`,
    tempoStop: `${nOffsets.tempoStart}%`,
    inBlue: `${nOffsets.inBlue}%`,
    recovery: `${nOffsets.recovery}`,
  };

  return (
    <linearGradient id="MyGradient" gradientTransform="rotate(90)">
      <stop offset={stringOffset.inRed} stopColor={COLORS.red} />
      <stop offset={stringOffset.threshold} stopColor={COLORS.red} />
      <stop offset={stringOffset.tempoStop} stopColor={COLORS.grey} />
      <stop offset={stringOffset.tempoStart} stopColor={COLORS.grey} />
      <stop offset={stringOffset.inBlue} stopColor={COLORS.skyblue} />
      <stop offset={stringOffset.recovery} stopColor={COLORS.white} />
    </linearGradient>
  );
};
