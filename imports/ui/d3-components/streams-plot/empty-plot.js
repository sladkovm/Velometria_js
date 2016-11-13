import React from 'react';
import { CHART_PROPS } from '../../styles/chart-props.js';

const EmptyPlot = () => (
  <svg width={CHART_PROPS.width} height={CHART_PROPS.height} />
);

export default EmptyPlot;
