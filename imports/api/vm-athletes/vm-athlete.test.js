import { expect } from 'chai';
import * as vmAthlete from './vm-athlete';

describe('vm-athlete.js', function () {
  describe('Power Zones', function () {
    const FTP = 270;
    const relPowerZones = {
      anaerobic: 1.1,
      threshold: 0.9,
      tempo: 0.75,
      endurance: 0.65,
      recovery: 0.55,
    };
    const absPowerZones = {
      anaerobic: relPowerZones.anaerobic * FTP,
      threshold: relPowerZones.threshold * FTP,
      tempo: relPowerZones.tempo * FTP,
      endurance: relPowerZones.endurance * FTP,
      recovery: relPowerZones.recovery * FTP,
    };
    describe('getFtp', function () {
      it('returns value of ftp', function () {
        const actual = vmAthlete.getFtp();
        expect(actual).to.be.equal(FTP);
      });
    });

    describe('getRelPowerZones', function () {
      it('returns object with values for Power Zones w.r.t. FTP', function () {
        const actual = vmAthlete.getRelPowerZones();
        expect(actual).be.deep.equal(relPowerZones);
      });
    });

    describe('getAbsPowerZones', function () {
      it('returns object with values for Power Zones in Watts', function () {
        const actual = vmAthlete.getAbsPowerZones();
        expect(actual).be.deep.equal(absPowerZones);
      });
    });
  });

  describe('Heartrate Zones', function () {
    const LTHR = 165;
    const relHeartrateZones = {
      anaerobic: 1.06,
      threshold: 1.0,
      tempo: 0.93,
      endurance: 0.81,
      recovery: 0.69,
    };
    const absHeartRateZones = {
      anaerobic: Math.round(relHeartrateZones.anaerobic * LTHR),
      threshold: Math.round(relHeartrateZones.threshold * LTHR),
      tempo: Math.round(relHeartrateZones.tempo * LTHR),
      endurance: Math.round(relHeartrateZones.endurance * LTHR),
      recovery: Math.round(relHeartrateZones.recovery * LTHR),
    };

    describe('getLthr', function () {
      it('returns value of lthr', function () {
        const actual = vmAthlete.getLthr();
        expect(actual).to.be.equal(LTHR);
      });
    });

    describe('getRelHeartrateZones', function () {
      it('returns object with values for Heartrate w.r.t. LTHR', function () {
        const actual = vmAthlete.getRelHeartrateZones();
        expect(actual).be.deep.equal(relHeartrateZones);
      });
    });

    describe('getAbsHeartrateZones', function () {
      it('returns object with values for Heartrate Zones in BPM', function () {
        const actual = vmAthlete.getAbsHeartrateZones();
        expect(actual).be.deep.equal(absHeartRateZones);
        // expect(actual).be.deep.closeTo(expected, 0.1);
      });
    });
  });

  describe('getCadenceZones', function () {
    it('returns object with values for Cadence Zones in RPM', function () {
      const expected = {
        high: 110,
        normal_max: 100,
        normal_min: 90,
        low: 70,
        very_low: 60,
      };
      const actual = vmAthlete.getCadenceZones();
      expect(actual).be.deep.equal(expected);
      // expect(actual).be.deep.closeTo(expected, 0.1);
    });
  });
});
