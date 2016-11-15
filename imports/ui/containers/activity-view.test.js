import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { scaleLinear } from 'd3-scale';
import { min as d3min, max as d3max } from 'd3';

import { objectifyStream } from './activity-view';


describe('activity-view.js', function () {
  describe('objectifyStream(stream)', function () {
    // Test data
    const stream = {
      0: { type: 'time' },
      1: { type: 'distance' },
      2: { type: 'altitude' },
      3: { type: 'watts' },
      4: { type: 'heartrate' },
      5: { type: 'velocity_smooth' },
      6: { type: 'cadence' },
    };

    const expected = {
      time: { type: 'time' },
      distance: { type: 'distance' },
      altitude: { type: 'altitude' },
      watts: { type: 'watts' },
      heartrate: { type: 'heartrate' },
      velocity_smooth: { type: 'velocity_smooth' },
      cadence: { type: 'cadence' },
    };

    it('returns object with keys set to stream names', function () {
      const actual = objectifyStream(stream);
      expect(actual).be.deep.equal(expected);
    });
  });

  describe('renderPower(xData, yData)', function () {
    if (Meteor.isServer) return;

    
  });
});
