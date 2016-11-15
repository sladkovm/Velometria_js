import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { min as d3min, max as d3max } from 'd3';

import { formatData, vmStream } from './vm-stream.js';


describe('vm-stream.js', function () {
  describe('formatData(data, type)', function () {
    it('returns data for type = altitude', function () {
      const data = [100, 110, 120, 130, 140, 150];
      const type = 'altitude';
      const actual = formatData(data, type);
      expect(actual).be.deep.equal(data);
    });
  });

  describe('returns undefined if input is undefined', function () {
    it('returns undefined if stream is undefined', function () {
      const actual = vmStream();
      expect(actual).to.be.equal(undefined);
    });
  });

  describe('altitude', function () {
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

    it('returns vmStream object', function () {
      const actual = vmStream(stream);
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
});
