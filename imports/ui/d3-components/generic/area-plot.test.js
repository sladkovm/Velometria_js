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
  const stopColors = [
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
      stopColors={stopColors}
    />
  );
  // DOM Verification
  it('Renders <g> node', function () {
    const actual = testObject.node;
    expect(actual.type).to.be.equal('g');
  });
  it('has <defs> as a first child', function () {
    const actual = testObject.node.props.children[0];
    expect(actual.type).to.be.equal('defs');
  });
  it('has <path> as a second child', function () {
    const actual = testObject.node.props.children[1];
    expect(actual.type).to.be.equal('path');
  });
  it('has fill set to grey if gradient is not specified', function () {
    const expected = 'grey';
    const actual = testObject.node.props.children[1].props.fill;
    expect(actual).to.be.equal(expected);
  });
  it('has fill set to gradient if gradient is well specified', function () {
    const expected = 'url(#value-gradient-)';
    const testObjectGradient = shallow(
      <AreaPlot
        xArray={xArray}
        yArray={yArray}
        xScale={xScale}
        yScale={yScale}
        gradient
        stopColors={stopColors}
      />
    );
    const actual = testObjectGradient.node.props.children[1].props.fill;
    expect(actual).to.be.equal(expected);
  });
});
