/** @file - ValueGradient for filling 'watts' or 'heartrate' streams
* @param {array} y - input data array
* @param {string} valueType - [optional] default = 'watts'... 'heartrate'
* @returns - <linearGradient id='valueTypeGradient'/>
*/

import React from 'react';
import { ZONES_COLORS } from '../../styles/colors.js';
import { zonesOffsetsPower, zonesOffsetsHR } from '../../../api/vm-athletes/athlete.js';


export const ValueGradient = ({ y, valueType = 'watts' }) => {
  let nOffsets = zonesOffsetsPower(y);
  if (valueType === 'heartrate') {
    nOffsets = zonesOffsetsHR(y);
  }
  const stringOffset = {
    anaerobic: `${nOffsets.anaerobic}%`,
    threshold: `${nOffsets.threshold}%`,
    tempoStart: `${nOffsets.tempoStop}%`,
    tempoStop: `${nOffsets.tempoStart}%`,
    endurance: `${nOffsets.endurance}%`,
    recovery: `${nOffsets.recovery}`,
  };

  return (
    <linearGradient id={`${valueType}Gradient`} gradientTransform="rotate(90)">
      <stop offset={stringOffset.anaerobic} stopColor={ZONES_COLORS.anaerobic} />
      <stop offset={stringOffset.threshold} stopColor={ZONES_COLORS.threshold} />
      <stop offset={stringOffset.tempoStop} stopColor={ZONES_COLORS.tempoStop} />
      <stop offset={stringOffset.tempoStart} stopColor={ZONES_COLORS.tempoStart} />
      <stop offset={stringOffset.endurance} stopColor={ZONES_COLORS.endurance} />
      <stop offset={stringOffset.recovery} stopColor={ZONES_COLORS.recovery} />
    </linearGradient>
  );
};
