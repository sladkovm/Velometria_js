import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';

import SpeedPlot, { renderLine, renderArea } from './speed-plot';

describe('speed-plot.js', function () {
  if (Meteor.isServer) return;

  // Test data
  const xData = {
    min: 0,
    max: 5,
    ticks: [0, 5],
    tickLabels: [0, 5],
    data: [0, 1, 2, 3, 4, 5],
    scaleDomain: scaleLinear().domain([0, 5]),
  };
  const yData = {
    min: 11,
    max: 6,
    ticks: [6, 11],
    tickLabels: [6, 11],
    data: [6, 7, 8, 9, 10, 11],
    scaleDomain: scaleLinear().domain([6, 11]),
  };

  describe('renderLine(xData, yData)', function () {
    const testObject = renderLine(xData, yData);
    it('Returns <LinePlot> element', function () {
      expect(testObject.type.name).to.be.equal('LinePlot');
      expect(testObject.props.xArray).be.deep.equal(xData.data);
      expect(testObject.props.yArray).be.deep.equal(yData.data);
      expect(testObject.props.xScale.domain()).be.deep.equal(xData.scaleDomain.domain());
      expect(testObject.props.yScale.domain()).be.deep.equal(yData.scaleDomain.domain());
    });
  });

  describe('renderArea(xArray, yArray)', function () {
    const testObject = renderArea(xData, yData);
    it('Returns <AreaPlot> element', function () {
      expect(testObject.type.name).to.be.equal('AreaPlot');
      expect(testObject.props.xArray).be.deep.equal(xData.data);
      expect(testObject.props.yArray).be.deep.equal(yData.data);
    });
  });

  describe('SpeedPlot(xData, vmSpeed, vmCadence, vmDistance)', function () {
    const testObject = shallow(
      <SpeedPlot
        xData={xData}
        altitude={yData}
        speed={yData}
        cadence={yData}
      />);
    // console.log(testObject);
    it('renders <svg> element', function () {
      expect(testObject.node.type).to.be.equal('svg');
    });
  });
});
