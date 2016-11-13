import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';

import { calcNrBins, HistogramY } from './histogram';


describe('histogram.js', function () {
  describe('calcNrBins(data, binWidth)', function () {
    // Test data
    const data = [0, 20, 40, 60, 80, 100];
    const binWidth = 20; // One bin per number
    const testObject = calcNrBins(data, binWidth);
    it('will return nr bins in the data vector given the desired binWidth', function () {
      expect(testObject).to.be.equal(6);
    });
  });

  describe('HistogramY', function () {
    if (Meteor.isServer) return;
    // Test data
    const data = [0, 50, 100, 200, 300, 400];
    const binWidth = 20; // One bin per number
    const chartProps = {
      leftMargin: 100,
      histogramWidth: 50,
      histogramPadding: 10,
      height: 200,
      bottomMargin: 20,
      topMargin: 20,
    };
    const yScale = scaleLinear()
            .domain([0, 100])
            .range([chartProps.height - chartProps.bottomMargin, chartProps.topMargin]);
    // Shallow render
    const testObject = shallow(
      <HistogramY
        data={data}
        yScale={yScale}
        chartProps={chartProps}
        binWidth={binWidth}
      />);
    // console.log(testObject);
    // Verify DOM
    it('renders <g> node', function () {
      expect(testObject.node.type).to.be.equal('g');
    });
    it('with children <rect>', function () {
      const children = testObject.node.props.children;
      const expNrBins = calcNrBins(data, binWidth);
      expect(children.length).to.be.equal(expNrBins - 1);
    });
  });
});
