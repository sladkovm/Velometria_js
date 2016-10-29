import React from 'react';
import * as d3 from 'd3';

const COLORS = {
  navy: '#2C3E50',
  red: '#E74C3C',
  white: '#ECF0F1',
  skyblue: '#3498DB',
  foggyblue: '#2980B9',
  yellow: '#ECF0A6',
}; // https://color.adobe.com/Flat-UI-color-theme-2469224/

const FTP = 290;


const AreaPlot = ({ x, y, xScale, yScale, stroke = "black" }) => {
  const data = x.map((d, i) => Object.assign({}, { x: d, y: y[i] }));
  const area = d3.area()
          .y0(yScale(d3.min(y)))
          .x((d) => xScale(d.x))
          .y1((d) => yScale(d.y));

  const maxY = d3.max(y);
  const minY = d3.min(y);
  console.log('power', maxY, minY);
  const rangeY = maxY - minY;
  const inRed = 0;
  const threshold = ((maxY - 1.1 * FTP) / rangeY) * 100;
  const tempoStop = ((maxY - 0.9 * FTP) / rangeY) * 100;
  const tempoStart = ((maxY - 0.65 * FTP) / rangeY) * 100;
  const inBlue = ((maxY - 0.55 * FTP) / rangeY) * 100;
  const recovery = 100;

  const offset = {
    inRed: `${inRed}%`,
    threshold: `${threshold}%`,
    tempoStart: `${tempoStop}%`,
    tempoStop: `${tempoStart}%`,
    inBlue: `${inBlue}%`,
    recovery: `${recovery}`,
  };
  console.log(offset);

  return (
    <g>
      <defs>
        <linearGradient id="MyGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={COLORS.red} />
          <stop offset={offset.inRed} stopColor={COLORS.red} />
          <stop offset={offset.threshold} stopColor={COLORS.red} />
          <stop offset={offset.tempoStop} stopColor={COLORS.yellow} />
          <stop offset={offset.tempoStart} stopColor={COLORS.yellow} />
          <stop offset={offset.inBlue} stopColor={COLORS.skyblue} />
          <stop offset={offset.recovery} stopColor={COLORS.skyblue} />
        </linearGradient>
      </defs>
      <path
        d={area(data)}
        stroke={stroke}
        fill="url(#MyGradient)"
      />
    </g>);
};

export default AreaPlot;
