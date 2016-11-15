import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { min as d3min, max as d3max } from 'd3';
import { vmAltitude } from './vm-altitude.js';

describe('vm-altitude.js', function () {
  describe('vmAltitude(stream)', function () {
    // Test data
    const stream = {
      type: 'altitude',
      data: [100, 110, 120, 130, 140, 150],
    };
    const min = d3min(stream.data);
    const max = d3max(stream.data);
    const ticks = [min, max].map(t => Math.round(t));
    const scaleDomain = scaleLinear().domain([min, max]);
    const expected = {
      type: stream.type,
      min,
      max,
      data: stream.data,
      ticks,
      tickLabels: ticks,
      scaleDomain,
    };

    const testObject = vmAltitude(stream);
    // console.log(testObject)

    // Verify
    it('returns object with min, max, data, ticks, tickLabels, scaleDomain', function () {
      expect(testObject.type).to.be.equal(expected.type);
      expect(testObject.min).to.be.equal(expected.min);
      expect(testObject.max).to.be.equal(expected.max);
      expect(testObject.data).be.deep.equal(expected.data);
      expect(testObject.ticks).be.deep.equal(expected.ticks);
      expect(testObject.tickLabels).be.deep.equal(expected.tickLabels);
      expect(testObject.scaleDomain.domain()).be.deep.equal(expected.scaleDomain.domain());
      expect(testObject.stopColors).to.be.equal(undefined);
    });
  });
});
