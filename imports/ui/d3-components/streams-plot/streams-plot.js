import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

// import LinePlot from './line-plot.js';
import AreaPlot from './area-plot.js';
// import { AxisX, AxisY } from './axis.js';
import { TickLabelsX, TickLabelsY } from '../generic/tick-labels.js';
import { TicksX, TicksY } from '../generic/ticks.js';
import { HistogramY } from './histogram.js';
import { ATHLETE } from '../../../api/vm-athletes/athlete.js';


export class StreamsPlot extends Component {
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
      topMargin: 5,
      bottomMargin: 30,
      leftMargin: 200,
      rightMargin: 20,
      xAxisOffset: 0,
      yAxisOffset: 0,
      xTextOffset: 10,
      yTextOffset: 20,
      tickLength: 5,
      textAxisYoffset: 5,
      histogramWidth: 100,
      histogramPadding: 20,
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

    const ticksX = [minDistance, maxDistance];
    const ticksY = [ATHLETE.Z2 * ATHLETE.FTP,
                    ATHLETE.Z4 * ATHLETE.FTP,
                    ATHLETE.Z5 * ATHLETE.FTP,
                    maxWatts];

    return (
      <div>
        <svg width={chartProps.width} height={chartProps.height}>
          <AreaPlot
            xArray={distance}
            yArray={watts}
            xScale={xScale}
            yScale={yScale}
            stroke="none"
            gradient
          />
          <TicksX
            ticks={ticksX}
            xScale={xScale}
            chartProps={chartProps}
          />
          <TicksY
            ticks={ticksY}
            yScale={yScale}
            chartProps={chartProps}
          />
          <TickLabelsX
            ticks={ticksX}
            tickLabels={ticksX.map(t => Math.round(t / 1000))}
            xScale={xScale}
            chartProps={chartProps}
          />
          <TickLabelsY
            ticks={ticksY}
            tickLabels={ticksY.map(t => Math.round(t))}
            yScale={yScale}
            chartProps={chartProps}
          />
          <HistogramY
            y={watts}
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

StreamsPlot.propTypes = {
  watts: PropTypes.array,
  distance: PropTypes.array,
};
