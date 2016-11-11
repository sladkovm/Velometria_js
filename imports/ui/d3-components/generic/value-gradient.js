/** @file - ValueGradient for filling 'watts' or 'heartrate' streams */

import React from 'react';
import { v4 } from 'uuid';


export const ValueGradient = ({ colorStops }) => {
  return (
    <linearGradient id={'valueGradientId'} gradientTransform="rotate(90)">
      {colorStops.map(c => {
        return <stop key={v4()} offset={c.offset + '%'} stopColor={c.color} />
      })}
    </linearGradient>
  );
};
