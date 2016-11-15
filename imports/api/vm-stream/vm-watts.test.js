import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { min as d3min, max as d3max } from 'd3';

import { getStopColors, vmWatts } from './vm-watts.js';


describe('vm-watts.js', function () {
  // Test data
  const stream = {
    type: 'watts',
    data: [200, 210, 220, 250, 300, 400],
  };
  const min = d3min(stream.data);
  const max = d3max(stream.data);
  const range = max - min;
  const zones = {
    anaerobic: 310,
    threshold: 270,
    tempo: 230,
    endurance: 200,
  };
  const ticks = [min,
                  zones.endurance,
                  zones.tempo,
                  zones.threshold,
                  zones.anaerobic,
                  max].map(t => Math.round(t));
  const tickLabels = ticks;
  const colors = ['red', 'red', 'grey', 'grey', 'blue', 'white'].reverse();
  const stopColors = [
    { offset: 100, stopColor: 'red' },
    { offset: Math.round(100 * (1 - (max - zones.anaerobic) / range)), stopColor: 'red' },
    { offset: Math.round(100 * (1 - (max - zones.threshold) / range)), stopColor: 'grey' },
    { offset: Math.round(100 * (1 - (max - zones.tempo) / range)), stopColor: 'grey' },
    { offset: Math.round(100 * (1 - (max - zones.endurance) / range)), stopColor: 'blue' },
    { offset: 0, stopColor: 'white' },
  ].reverse();
  const scaleDomain = scaleLinear().domain([min, max]);
  // Verify

  describe('getStopColors(stream, zones, colors)', function () {
    it('returns stopColors object', function () {
      const actual = getStopColors(stream.data, zones, colors);
      const expected = stopColors;
      expect(actual).be.deep.equal(expected);
    });
  });


  describe('vmWatts(stream, zones, colors)', function () {
    it('returns object with fields: min, max, data, ticks, ticksLabels, scaleDomain, colorStops',
      function () {
        const actual = vmWatts(stream, zones, colors);
        const expected = {
          type: stream.type,
          min,
          max,
          data: stream.data,
          ticks,
          tickLabels,
          scaleDomain,
          stopColors,
        };
        expect(actual.type).to.be.equal(expected.type);
        expect(actual.min).to.be.equal(expected.min);
        expect(actual.max).to.be.equal(expected.max);
        expect(actual.data).be.deep.equal(expected.data);
        expect(actual.ticks).be.deep.equal(expected.ticks);
        expect(actual.tickLabels).be.deep.equal(expected.tickLabels);
        expect(actual.scaleDomain.domain()).be.deep.equal(expected.scaleDomain.domain());
        expect(actual.stopColors).be.deep.equal(expected.stopColors);
      });
    it('render with default colors',
      function () {
        const actual = vmWatts(stream, zones);
        const expected = {
          type: stream.type,
          min,
          max,
          data: stream.data,
          ticks,
          tickLabels,
          scaleDomain,
        };
        expect(actual.type).to.be.equal(expected.type);
        expect(actual.min).to.be.equal(expected.min);
        expect(actual.max).to.be.equal(expected.max);
        expect(actual.data).be.deep.equal(expected.data);
        expect(actual.ticks).be.deep.equal(expected.ticks);
        expect(actual.tickLabels).be.deep.equal(expected.tickLabels);
        expect(actual.scaleDomain.domain()).be.deep.equal(expected.scaleDomain.domain());
      });
    it('returns undefined is stream is undefined', function () {
      const actual = vmWatts(undefined, zones, colors);
      const expected = undefined;
      expect(actual).to.be.equal(expected);
    });
  });
});
