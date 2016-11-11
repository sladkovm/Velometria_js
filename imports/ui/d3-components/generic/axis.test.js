import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AxisX, AxisY } from './axis';


describe('axis.js', function () {
  if (Meteor.isServer) return;

  describe('AxisX', function () {
    // create test data
    const ticks = [0, 1];
    const xScale = t => t;
    const chartProps = {
      height: 100,
      bottomMargin: 20,
      xAxisOffset: 10,
    };

    // Challow render the Component
    const actual = shallow(
      <AxisX
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
    it('Single child of <g> has a type <line> with correct y1, y2, x1, x2', function () {
      const expectedType = 'line';
      const expectedY1 = (chartProps.height - chartProps.bottomMargin) + chartProps.xAxisOffset;
      const expectedY2 = expectedY1;
      const expectedX1 = xScale(0);
      const expectedX2 = xScale(1);

      const c = actual.node.props.children;
      expect(c.type).to.be.equal(expectedType);
      expect(c.props.y1).to.be.equal(expectedY1);
      expect(c.props.y2).to.be.equal(expectedY2);
      expect(c.props.x1).to.be.equal(expectedX1);
      expect(c.props.x2).to.be.equal(expectedX2);
    });
  });


  describe('AxisY', function () {
    // create test data
    const ticks = [0, 1];
    const yScale = t => t;
    const chartProps = {
      leftMargin: 100,
      yAxisOffset: 10,
    };

    // Challow render the Component
    const actual = shallow(
      <AxisY
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
    it('Single child of <g> has a type <line> with correct y1, y2, x1, x2', function () {
      const expectedType = 'line';
      const expectedX1 = chartProps.leftMargin - chartProps.yAxisOffset;
      const expectedX2 = expectedX1;
      const expectedY1 = yScale(1);
      const expectedY2 = yScale(0);

      const c = actual.node.props.children;
      expect(c.type).to.be.equal(expectedType);
      expect(c.props.x1).to.be.equal(expectedX1);
      expect(c.props.x2).to.be.equal(expectedX2);
      expect(c.props.y1).to.be.equal(expectedY1);
      expect(c.props.y2).to.be.equal(expectedY2);
    });
  });
});
