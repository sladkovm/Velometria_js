import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { vmCadence } from './vm-cadence.js';

describe('vm-cadence.js', function () {
  describe('vmCadenece(stream)', function () {
    // Test data
    const stream = [0, 1, 2, 3, 4, 5];
    const expected = {
      min: 0,
      max: 5,
      data: stream,
      ticks: [0, 5].map(t => Math.round(t)),
      tickLabels: [0, 5].map(t => Math.round(t)),
      scaleDomain: scaleLinear().domain([0, 5]),
    };

    const testObject = vmCadence(stream);
    // console.log(testObject)

    // Verify
    it('returns object with min, max, data, ticks, tickLabels, scaleDomain', function () {
      expect(testObject.min).to.be.equal(expected.min);
      expect(testObject.max).to.be.equal(expected.max);
      expect(testObject.data).be.deep.equal(expected.data);
      expect(testObject.ticks).be.deep.equal(expected.ticks);
      expect(testObject.tickLabels).be.deep.equal(expected.tickLabels);
      expect(testObject.scaleDomain.domain()).be.deep.equal(expected.scaleDomain.domain());
    });
  });
});
