import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ValueGradient } from './value-gradient.js';

describe('value-gradient.js', function () {
  if (Meteor.isServer) return;

  // Test data
  const colorStops = [
    { offset: 100, color: 'red' },
    { offset: 80, color: 'red' },
    { offset: 60, color: 'grey' },
    { offset: 40, color: 'grey' },
    { offset: 20, color: 'blue' },
    { offset: 0, color: 'white' },
  ];
  const testObject = shallow(<ValueGradient colorStops={colorStops} />);

  // DOM Verification
  it('takes colorStops object as an input and renders <linearGradient> node', function () {
    const expected = 'linearGradient';
    const actual = testObject.node.type;
    expect(actual).to.be.equal(expected);
  });
  it('has <stop> components as children', function () {
    const expected = 'stop';
    const actual = testObject.node.props.children;
    actual.forEach(c => {
      expect(c.type).to.be.equal(expected);
    });
  });
  it('has id = valueGradienId', function () {
    const expected = 'valueGradientId';
    const actual = testObject.node.props.id;
    expect(actual).to.be.equal(expected);
  });
});
