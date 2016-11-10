import { expect } from 'chai';
import * as vm from './vm-distance.js';


describe('vm-distance', function() {
  it('returns undefined if input is undefined', function() {
    const actual = vm.distance();
    const expected = undefined;
    expect(actual).to.be.equal(expected);
  });
  it('return object if input is defined', function() {
    const actual = typeof vm.distance([0, 1, 2, 3]);
    const expected = 'object';
    expect(actual).to.be.equal(expected);
  });

  describe('and', function() {
    const data = [0, 100, 1000, 5000];
    const distance = vm.distance(data);
    it('has propery min', function() {
      const expected = 0;
      const actual = distance.min;
      expect(actual).to.be.equal(expected);
    });
    it('has propery max', function() {
      const expected = 5000 / 1000;
      const actual = distance.max;
      expect(actual).to.be.equal(expected);
    });
    it('has propery data on distance in km', function() {
      const expected = data.map(d => d / 1000);
      const actual = distance.data;
      expect(actual).be.deep.equal(expected);
    });
    it('has an Array propery ticks', function() {
      const actual = distance;
      expect(actual).to.have.property('ticks');
      expect(actual.ticks).to.be.an('Array');
    });
    it('has an Array propery ticksLabels', function() {
      const actual = distance;
      expect(actual).to.have.property('ticksLabels');
      expect(actual.ticks).to.be.an('Array');
    });
    it('ticksLabels are rounded positions of ticks', function() {
      const actual = distance.ticks.map(t => Math.round(t));
      const expected = distance.ticksLabels;
      expect(actual).be.deep.equal(expected);
    });
    it('has a function propery xScaleDomain', function() {
      const actual = distance;
      expect(actual).to.have.property('xScaleDomain');
      expect(actual.xScaleDomain).to.be.a('function');
    });
  });
});
