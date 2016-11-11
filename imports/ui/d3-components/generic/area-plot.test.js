import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import AreaPlot from './area-plot.js';

describe('area-plot.js', function () {
  if (Meteor.isServer) return;

  // Test data
  const xArray = [0, 1, 2, 3, 4, 5];
  const yArray = [0, 1, 2, 3, 4, 5];
  const xScale = t => t;
  const yScale = t => t;
  const colorStops = [
    { offset: 100, color: 'red' },
    { offset: 80, color: 'red' },
    { offset: 60, color: 'grey' },
    { offset: 40, color: 'grey' },
    { offset: 20, color: 'blue' },
    { offset: 0, color: 'white' },
  ];
  const testObject = shallow(
    <AreaPlot
      xArray={xArray}
      yArray={yArray}
      xScale={xScale}
      yScale={yScale}
      colorStops={colorStops}
    />
  );
  // DOM Verification
  it('Renders <g> node', function () {
    const expected = 'g';
    const actual = testObject.node.type;
    expect(actual).to.be.equal(expected);
  });
  it('has <defs> as a first child', function () {
    const expected = 'defs';
    const actual = testObject.node.props.children[0].type;
    expect(actual).to.be.equal(expected);
  });
  it('has <path> as a second child', function () {
    const expected = 'path';
    const actual = testObject.node.props.children[1].type;
    expect(actual).to.be.equal(expected);
  });
  it('has fill set to grey if gradient is not specified', function () {
    const expected = 'grey';
    const actual = testObject.node.props.children[1].props.fill;
    expect(actual).to.be.equal(expected);
  });
  it('has fill set to gradient if gradient is well specified', function () {
    const expected = 'url(#valueGradientid)';
    const testObjectGradient = shallow(
      <AreaPlot
        xArray={xArray}
        yArray={yArray}
        xScale={xScale}
        yScale={yScale}
        gradient
        colorStops={colorStops}
      />
    );
    const actual = testObjectGradient.node.props.children[1].props.fill;
    expect(actual).to.be.equal(expected);
  });
});
