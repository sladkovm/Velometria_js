import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import PowerPlot from './power-plot.js';


describe('power-plot.js', function () {
  if (Meteor.isServer) return;

  // Test data
  // Test data
  const colorStops = [
    { offset: 100, color: 'red' },
    { offset: 80, color: 'red' },
    { offset: 60, color: 'grey' },
    { offset: 40, color: 'grey' },
    { offset: 20, color: 'blue' },
    { offset: 0, color: 'white' },
  ];
  const xData = {
    min: 0,
    max: 5,
    ticks: [0, 5],
    tickLabels: [0, 5],
    data: [0, 1, 2, 3, 4, 5],
    scaleDomain: scaleLinear().domain([0, 5]),
    colorStops,
  };
  const yData = {
    min: 0,
    max: 5,
    ticks: [0, 5],
    tickLabels: [0, 5],
    data: [0, 1, 2, 3, 4, 5],
    scaleDomain: scaleLinear().domain([0, 5]),
    colorStops,
  };

  const testObject = shallow(
    <PowerPlot
      xData={xData}
      yData={yData}
    />);
  // console.log(testObject);

  // DOM Verifications
  it('renders <svg> element', function () {
    const expected = 'svg';
    const actual = testObject.node.type;
    expect(actual).to.be.equal(expected);
  });
  it('renders child <AreaPlot>', function () {
    const actual = testObject.node.props.children[0];
    expect(actual.type.name).to.be.equal('AreaPlot');
  });
  it('renders child <TicksX>', function () {
    const expected = 'TicksX';
    const actual = testObject.node.props.children[1].type.name;
    expect(actual).to.be.equal(expected);
  });
  it('renders child <TicksY>', function () {
    const expected = 'TicksY';
    const actual = testObject.node.props.children[2].type.name;
    expect(actual).to.be.equal(expected);
  });
  it('renders child <TickLabelsX>', function () {
    const expected = 'TickLabelsX';
    const actual = testObject.node.props.children[3].type.name;
    expect(actual).to.be.equal(expected);
  });
  it('renders child <TickLabelsY>', function () {
    const expected = 'TickLabelsY';
    const actual = testObject.node.props.children[4].type.name;
    expect(actual).to.be.equal(expected);
  });
  it('renders child <HistogramY>', function () {
    const expected = 'HistogramY';
    const actual = testObject.node.props.children[5].type.name;
    expect(actual).to.be.equal(expected);
  });
});
