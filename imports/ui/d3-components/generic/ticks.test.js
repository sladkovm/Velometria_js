import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TicksX, TicksY } from './ticks';


describe('ticks', function () {
  if (Meteor.isServer) return;

  describe('TicksX', function () {
    // create test data
    const ticks = [0, 1];
    const xScale = t => t;
    const chartProps = {
      height: 100,
      bottomMargin: 20,
      xAxisOffset: 10,
      tickLength: 5,
    };

    // Challow render the Component
    const actual = shallow(
      <TicksX
        ticks={ticks}
        xScale={xScale}
        chartProps={chartProps}
      />
    );

    // Verify DOM
    it('will render <g> node', function () {
      const expected = 'g';
      expect(actual.node.type).to.be.equal(expected);
    });
    it('<g> will have number of children that corresponds to ticks.length', function () {
      const expected = ticks.length;
      expect(actual.node.props.children.length).to.be.equal(expected);
    });
    it('Each child of <g> has a type <line> with correct y1, y2, x1, x2', function () {
      const expectedType = 'line';
      const expectedY1 = (chartProps.height - chartProps.bottomMargin) + chartProps.xAxisOffset;
      const expectedY2 = expectedY1 + chartProps.tickLength;
      const expectedX = ticks.map(t => xScale(t));

      actual.node.props.children.forEach((c, i) => {
        expect(c.type).to.be.equal(expectedType);
        expect(c.props.y1).to.be.equal(expectedY1);
        expect(c.props.y2).to.be.equal(expectedY2);
        expect(c.props.x1).to.be.equal(expectedX[i]);
        expect(c.props.x2).to.be.equal(expectedX[i]);
      });
    });
  });


  describe('TicksY', function () {
    // create test data
    const ticks = [0, 1];
    const yScale = t => t;
    const chartProps = {
      leftMargin: 100,
      yAxisOffset: 10,
      histogramWidth: 50,
      tickLength: 5,
    };

    // Challow render the Component
    const actual = shallow(
      <TicksY
        ticks={ticks}
        yScale={yScale}
        chartProps={chartProps}
      />
    );

    // Verify DOM
    it('will render <g> node', function () {
      const expected = 'g';
      expect(actual.node.type).to.be.equal(expected);
    });
    it('<g> will have number of children that corresponds to ticks.length', function () {
      const expected = ticks.length;
      expect(actual.node.props.children.length).to.be.equal(expected);
    });
    it('Each child of <g> has a type <line> with correct y1, y2, x1, x2', function () {
      const expectedType = 'line';
      const expectedX1 = chartProps.leftMargin - chartProps.yAxisOffset - chartProps.histogramWidth;
      const expectedX2 = expectedX1 - chartProps.tickLength;
      const expectedY = ticks.map(t => yScale(t));

      actual.node.props.children.forEach((c, i) => {
        expect(c.type).to.be.equal(expectedType);
        expect(c.props.x1).to.be.equal(expectedX1);
        expect(c.props.x2).to.be.equal(expectedX2);
        expect(c.props.y1).to.be.equal(expectedY[i]);
        expect(c.props.y2).to.be.equal(expectedY[i]);
      });
    });
  });
});
