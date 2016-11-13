/** @file - ValueGradient for filling 'watts' or 'heartrate' streams */

import React from 'react';
import { v4 } from 'uuid';

export const ValueGradient = ({ stopColors, id, scale }) => {
  if (!stopColors) return <linearGradient />;
  return (
    <linearGradient
      id={id}
      gradientUnits={"userSpaceOnUse"}
      x1={0}
      x2={0}
      y1={scale.range()[0]}
      y2={scale.range()[1]}
    >
      {stopColors.map(c => (
        <stop key={v4()} offset={`${c.offset}%`} stopColor={c.stopColor} />
      ))}
    </linearGradient>
  );
};

 // gradientTransform="rotate(90)"

 // gradientUnits={"userSpaceOnUse"}
 // x1={0}
 // x2={0}
 // y1={170}
 // y2={5}
