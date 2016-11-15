import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { min as d3min, max as d3max } from 'd3';

import { vmDistance } from './vm-distance.js';


describe('vm-distance.js', function () {
  it('returns undefined if stream is undefined', function () {
    const actual = vmDistance();
    expect(actual).to.be.equal(undefined);
  });
  it('return object with type, min, max, data, ticks, tickLabels, scaleDomain', function () {
    // Test data
    const stream = {
      type: 'distance',
      data: [0, 1, 2, 3],
    };
    const km = stream.data.map(d => d / 1000);
    const min = d3min(km);
    const max = d3max(km);
    const ticks = [min, max].map(t => Math.round(t));
    const tickLabels = ticks;
    const scaleDomain = scaleLinear().domain([min, max].map(t => Math.round(t)));
    const expected = {
      type: 'distance',
      min,
      max,
      data: km,
      ticks,
      tickLabels,
      scaleDomain,
    };

    const actual = vmDistance(stream);
    expect(actual.type).to.be.equal(expected.type);
    expect(actual.min).to.be.equal(expected.min);
    expect(actual.max).to.be.equal(expected.max);
    expect(actual.data).be.deep.equal(expected.data);
    expect(actual.ticks).be.deep.equal(expected.ticks);
    expect(actual.tickLabels).be.deep.equal(expected.tickLabels);
    expect(actual.scaleDomain.domain()).be.deep.equal(expected.scaleDomain.domain());
    expect(actual.stopColors).to.be.equal(undefined);
  });
});
