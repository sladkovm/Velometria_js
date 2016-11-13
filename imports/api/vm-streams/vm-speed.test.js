import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { mps2kph, vmSpeed } from './vm-speed.js';

describe('vm-speed.js', function () {
  describe('mps2kph(data)', function () {
    it('converts array of mps to array of kph [1.0, 10.0] => [3.6, 36.0]', function () {
      expect(mps2kph([1.0, 10.0])).deep.equal([3.6, 36.0]);
    });
    it('converts single number from kph to mph', function () {
      expect(mps2kph(1.0)).to.be.equal(3.6);
    });
  });

  describe('vmSpeed(stream)', function () {
    // Test data
    const stream = [0, 1, 2, 3, 4, 5];
    const expected = {
      min: mps2kph(0),
      max: mps2kph(5),
      data: mps2kph(stream),
      ticks: [mps2kph(0), mps2kph(5)].map(t => Math.round(t)),
      tickLabels: [mps2kph(0), mps2kph(5)].map(t => Math.round(t)),
      scaleDomain: scaleLinear().domain([mps2kph(0), mps2kph(5)]),
    };

    const testObject = vmSpeed(stream);
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
