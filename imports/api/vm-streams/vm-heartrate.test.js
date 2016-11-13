import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { getStopColors, vmHeartrate } from './vm-heartrate.js';


describe('vm-heartrate.js', function () {
  // Test data
  const stream = {
    data: [0, 1, 2, 3, 4, 5],
  };
  const zones = {
    anaerobic: 4,
    threshold: 3,
    tempo: 2,
    endurance: 1,
  };
  const colors = ['red', 'red', 'grey', 'grey', 'blue', 'white'].reverse();
  const stopColors = [
    { offset: 100, stopColor: 'red' },
    { offset: Math.round(100 * (1 - (5 - zones.anaerobic) / 5)), stopColor: 'red' },
    { offset: Math.round(100 * (1 - (5 - zones.threshold) / 5)), stopColor: 'grey' },
    { offset: Math.round(100 * (1 - (5 - zones.tempo) / 5)), stopColor: 'grey' },
    { offset: Math.round(100 * (1 - (5 - zones.endurance) / 5)), stopColor: 'blue' },
    { offset: 0, stopColor: 'white' },
  ].reverse();
  const scaleDomain = scaleLinear().domain([0, 5]);
  // Verify

  describe('getStopColors(stream, zones, colors)', function () {
    it('returns stopColors object', function () {
      const actual = getStopColors(stream.data, zones, colors);
      const expected = stopColors;
      expect(actual).be.deep.equal(expected);
    });
  });


  describe('vmHeartrate(stream, zones, colors)', function () {
    it('returns object with fields: min, max, data, ticks, ticksLabels, scaleDomain, colorStops',
      function () {
        const actual = vmHeartrate(stream, zones, colors);
        const expected = {
          min: 0,
          max: 5,
          data: stream.data,
          ticks: stream.data.map(t => Math.round(t)),
          tickLabels: stream.data.map(t => Math.round(t)),
          scaleDomain,
          stopColors,
        };
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
        const actual = vmHeartrate(stream, zones);
        const expected = {
          min: 0,
          max: 5,
          data: stream.data,
          ticks: stream.data.map(t => Math.round(t)),
          tickLabels: stream.data.map(t => Math.round(t)),
          scaleDomain,
        };
        expect(actual.min).to.be.equal(expected.min);
        expect(actual.max).to.be.equal(expected.max);
        expect(actual.data).be.deep.equal(expected.data);
        expect(actual.ticks).be.deep.equal(expected.ticks);
        expect(actual.tickLabels).be.deep.equal(expected.tickLabels);
        expect(actual.scaleDomain.domain()).be.deep.equal(expected.scaleDomain.domain());
      });
    it('returns undefined is stream is undefined', function () {
      const actual = vmHeartrate(undefined, zones, colors);
      const expected = undefined;
      expect(actual).to.be.equal(expected);
    });
  });
});
