import { expect } from 'chai';
import * as vmAthlete from './vm-athlete';

describe('vm-athlete.js', function () {
  describe('getFtp', function () {
    it('returns value of ftp', function () {
      const expected = 270.0;
      const actual = vmAthlete.getFtp();
      expect(actual).to.be.equal(expected);
    });
  });

  describe('getLthr', function () {
    it('returns value of lthr', function () {
      const expected = 165;
      const actual = vmAthlete.getLthr();
      expect(actual).to.be.equal(expected);
    });
  });

  describe('getRelPowerZones', function () {
    it('returns object with values for Power Zones w.r.t. FTP', function () {
      const expected = {
        anaerobic: 1.1,
        threshold: 0.9,
        tempo: 0.75,
        endurance: 0.55,
      };
      const actual = vmAthlete.getRelPowerZones();
      expect(actual).be.deep.equal(expected);
    });
  });

  describe('getRelHeartrateZones', function () {
    it('returns object with values for Heartrate w.r.t. LTHR', function () {
      const expected = {
        anaerobic: 1.06,
        threshold: 1.0,
        tempo: 0.93,
        endurance: 0.81,
      };
      const actual = vmAthlete.getRelHeartrateZones();
      expect(actual).be.deep.equal(expected);
    });
  });

  describe('getAbsPowerZones', function () {
    it('returns object with values for Power Zones in Watts', function () {
      const FTP = 270.0;
      const expected = {
        anaerobic: 1.1 * FTP,
        threshold: 0.9 * FTP,
        tempo: 0.75 * FTP,
        endurance: 0.55 * FTP,
      };
      const actual = vmAthlete.getAbsPowerZones();
      expect(actual).be.deep.equal(expected);
    });
  });

  describe('getAbsHeartrateZones', function () {
    it('returns object with values for Heartrate Zones in BPM', function () {
      const LTHR = 165.0;
      const expected = {
        anaerobic: Math.round(1.06 * LTHR),
        threshold: Math.round(1.0 * LTHR),
        tempo: Math.round(0.93 * LTHR),
        endurance: Math.round(0.81 * LTHR),
      };
      const actual = vmAthlete.getAbsHeartrateZones();
      expect(actual).be.deep.equal(expected);
      // expect(actual).be.deep.closeTo(expected, 0.1);
    });
  });
});
