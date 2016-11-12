import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import * as vm from './vm-distance.js';


describe('vm-distance.js', function () {
  // Test data
  const stream = [0, 1, 2, 3];
  // Verification
  it('returns undefined if stream is undefined', function () {
    const actual = vm.vmDistance();
    expect(actual).to.be.equal(undefined);
  });
  it('return object with min, max, data, ticks, tickLabels, scaleDomain', function () {
    const actual = vm.vmDistance(stream);
    const expected = {
      min: 0 / 1000,
      max: 3 / 1000,
      data: stream.map(d => d / 1000),
      ticks: [0, 3].map(d => d / 1000),
      tickLabels: [0, 3].map(t => Math.round(t / 1000)),
      scaleDomain: scaleLinear().domain([0 / 1000, 3 / 1000]),
    };
    expect(actual.min).to.be.equal(expected.min);
    expect(actual.max).to.be.equal(expected.max);
    expect(actual.data).be.deep.equal(expected.data);
    expect(actual.ticks).be.deep.equal(expected.ticks);
    expect(actual.tickLabels).be.deep.equal(expected.tickLabels);
    expect(actual.scaleDomain.domain()).be.deep.equal(expected.scaleDomain.domain());
  });
});
