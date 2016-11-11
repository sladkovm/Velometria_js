import { expect } from 'chai';
import * as vm from './vm-watts.js';
import { min as d3min, max as d3max} from 'd3';


describe('vm-watts.js', function () {
  it('returns undefined if input is undefined', function () {
    const actual = vm.watts();
    const expected = undefined;
    expect(actual).to.be.equal(expected);
  });
  it('return object if input is defined', function () {
    const actual = typeof vm.watts([0, 1, 2, 3]);
    const expected = 'object';
    expect(actual).to.be.equal(expected);
  });

  describe('and', function () {
    // Test data
    const data = [0, 1, 2, 3];
    const watts = vm.watts(data);
    // Verification
    it('has propery min', function () {
      const expected = 0;
      const actual = watts.min;
      expect(actual).to.be.equal(expected);
    });
    it('has propery max', function () {
      const expected = 3;
      const actual = watts.max;
      expect(actual).to.be.equal(expected);
    });
    it('has an Array propery data', function () {
      const expected = data;
      const actual = watts.data;
      expect(actual).be.deep.equal(expected);
    });
    it('has an Array propery ticks', function () {
      const actual = watts;
      expect(actual).to.have.property('ticks');
      expect(actual.ticks).to.be.an('Array');
    });
    it('has a function propery yScaleDomain', function () {
      const actual = watts;
      expect(actual).to.have.property('yScaleDomain');
      expect(actual.yScaleDomain).to.be.a('function');
    });
  });
});
