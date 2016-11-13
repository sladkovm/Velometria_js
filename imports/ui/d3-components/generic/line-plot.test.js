import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';

import LinePlot from './line-plot';

describe('line-plot.js', function () {
  if (Meteor.isServer) return;

  // Test data
  const xArray = [0, 1, 2, 3, 4, 5];
  const yArray = [0, 1, 2, 3, 4, 5];
  const xScale = scaleLinear().domain([0, 5]).range([0, 100]);
  const yScale = scaleLinear().domain([0, 5]).range([0, 100]);

  const testObject = shallow(
    <LinePlot
      xArray={xArray}
      yArray={yArray}
      xScale={xScale}
      yScale={yScale}
    />);

  // Verify
  it('renders <path> element', function () {
    expect(testObject.node.type).to.be.equal('path');
    expect(testObject.node.props.fill).to.be.equal('none');
  });
});
