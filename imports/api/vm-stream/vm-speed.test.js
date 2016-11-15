import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { min as d3min, max as d3max } from 'd3';

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
    const stream = {
      type: 'velocity_smooth',
      data: [10, 20, 30, 40, 50],
    };
    const data = mps2kph(stream.data);
    const min = d3min(data);
    const max = d3max(data);
    const ticks = [min, max].map(t => Math.round(t));
    const scaleDomain = scaleLinear().domain([min, max]);
    const expected = {
      type: stream.type,
      min,
      max,
      data,
      ticks,
      tickLabels: ticks,
      scaleDomain,
    };

    const testObject = vmSpeed(stream);
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
