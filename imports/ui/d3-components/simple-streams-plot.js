import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

import LinePlot from './line-plot.js';
import AreaPlot from './area-plot.js';
import { AxisX, AxisY } from './axis.js';


export class SimpleStreamsPlot extends Component {
  constructor (props) {
    super(props);
  }

  // componentDidMount() {
  //   this.renderPlot();
  // }
  //
  // componentDidUpdate() {
  //   this.renderPlot();
  // }

  renderPlot() {
    const { watts, distance } = this.props;
    const chartProps = {
      width: 720,
      height: 200,
      topMargin: 30,
      bottomMargin: 50,
      leftMargin: 100,
      rightMargin: 20,
      xAxisOffset: 0,
      yAxisOffset: 0,
      xTextOffset: 10,
      yTextOffset: 20,
      tickLength: 5,
    };

    const minWatts = d3.min(watts);
    const maxWatts = d3.max(watts);
    const minDistance = d3.min(distance);
    const maxDistance = d3.max(distance);

    const xScale = d3.scaleLinear()
            .domain([minDistance, maxDistance])
            .range([chartProps.leftMargin, chartProps.width - chartProps.rightMargin]);

    const yScale = d3.scaleLinear()
            .domain([minWatts, maxWatts])
            .range([chartProps.height - chartProps.bottomMargin, chartProps.topMargin]);

    return (
      <div>
        <svg width={chartProps.width} height={chartProps.height}>
          <LinePlot
            x={distance}
            y={watts}
            xScale={xScale}
            yScale={yScale}
          />
          <AxisX
            ticks={[minDistance, maxDistance]}
            xScale={xScale}
            chartProps={chartProps}
          />
          <AxisY
            ticks={[minWatts, maxWatts]}
            yScale={yScale}
            chartProps={chartProps}
          />
        </svg>
        <svg width={chartProps.width} height={chartProps.height}>
          <AreaPlot
            x={distance}
            y={watts}
            xScale={xScale}
            yScale={yScale}
            stroke="none"
          />
          <AxisX
            ticks={[minDistance, maxDistance]}
            xScale={xScale}
            chartProps={chartProps}
          />
          <AxisY
            ticks={[minWatts, maxWatts]}
            yScale={yScale}
            chartProps={chartProps}
          />
        </svg>
      </div>
    );
  }

  render() {
    return this.renderPlot();
  }
}

SimpleStreamsPlot.propTypes = {
  watts: PropTypes.array,
  distance: PropTypes.array,
};
