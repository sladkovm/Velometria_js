import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { ValueGradient } from './value-gradient.js';

describe('value-gradient.js', function () {
  if (Meteor.isServer) return;

  // Test data
  const stopColors = [
    { offset: 0, stopColor: 'red' },
    { offset: 50, stopColor: 'green' },
    { offset: 100, stopColor: 'blue' },
  ];
  const id = 'linear-gradient-id';
  const scale = scaleLinear().range([0, 100]);
  const testObject = shallow(
    <ValueGradient
      stopColors={stopColors}
      id={id}
      scale={scale}
    />
  );
  // DOM Verification
  it('renders <linearGradient> node with id, x1, x2, y1, y2, gradientUnits', function () {
    expect(testObject.node.type).to.be.equal('linearGradient');
    expect(testObject.node.props.id).to.be.equal(id);
    expect(testObject.node.props.x1).to.be.equal(0);
    expect(testObject.node.props.x2).to.be.equal(0);
    expect(testObject.node.props.y1).to.be.equal(scale.range()[0]);
    expect(testObject.node.props.y2).to.be.equal(scale.range()[1]);
  });
  it('with <stop> components as children', function () {
    const children = testObject.node.props.children;
    children.forEach((c, i) => {
      expect(c.type).to.be.equal('stop');
      expect(c.props.offset).to.be.equal(`${stopColors[i].offset}%`);
      expect(c.props.stopColor).to.be.equal(stopColors[i].stopColor);
    });
  });
});
