import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TickLabelsX, TickLabelsY } from './tick-labels';


describe('tick-labels.js', function () {
  if (Meteor.isServer) return;

  describe('TickLabelsX', function () {
    // create test data
    const ticks = [0, 1];
    const tickLabels = ticks;
    const xScale = t => t;
    const chartProps = {
      height: 100,
      bottomMargin: 20,
      xAxisOffset: 10,
      yTextOffset: 5,
    };

    // Challow render the Component
    const actual = shallow(
      <TickLabelsX
        ticks={ticks}
        tickLabels={tickLabels}
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
    it('Each child of <g> has a type <text> with correct x, y', function () {
      const expectedType = 'text';
      const expectedY = (chartProps.height - chartProps.bottomMargin)
                        + chartProps.xAxisOffset + chartProps.yTextOffset;
      const expectedX = ticks.map(t => xScale(t));

      actual.node.props.children.forEach((c, i) => {
        expect(c.type).to.be.equal(expectedType);
        expect(c.props.y).to.be.equal(expectedY);
        expect(c.props.x).to.be.equal(expectedX[i]);
      });
    });
  });


  describe('TickLabelsY', function () {
    // create test data
    const ticks = [0, 1];
    const tickLabels = ticks;
    const yScale = t => t;
    const chartProps = {
      leftMargin: 100,
      yAxisOffset: 10,
      histogramWidth: 50,
      xTextOffset: 5,
      textAxisYoffset: 5,
    };

    // Challow render the Component
    const actual = shallow(
      <TickLabelsY
        ticks={ticks}
        tickLabels={tickLabels}
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
    it('Each child of <g> has a type <text> with correct x, y', function () {
      const expectedType = 'text';
      const expectedX = chartProps.leftMargin - chartProps.yAxisOffset
                      - chartProps.histogramWidth - chartProps.xTextOffset;
      const expectedY = ticks.map(t => yScale(t) + chartProps.textAxisYoffset);

      actual.node.props.children.forEach((c, i) => {
        expect(c.type).to.be.equal(expectedType);
        expect(c.props.x).to.be.equal(expectedX);
        expect(c.props.y).to.be.equal(expectedY[i]);
      });
    });
  });
});
