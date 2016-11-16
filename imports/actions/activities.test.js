import { expect } from 'chai';
import { isFSA } from 'flux-standard-action';
import { normalize } from 'normalizr';

import * as schema from './schema';
import { fetchActivitiesRequest,
         fetchActivitiesSuccess,
         fetchActivitiesError } from './activities';

describe('actions: activities.js', function () {
  describe('fetchActivitiesRequest', function () {
    it('returns FSA action', function () {
      const expected = {
        type: 'FETCH_ACTIVITIES_REQUEST',
      };
      const actual = fetchActivitiesRequest();
      expect(isFSA(actual)).to.be.equal(true);
      expect(actual).be.deep.equal(expected);
    });
  });

  describe('fetchActivitiesSuccess', function () {
    it('returns FSA action', function () {
      const expected = {
        type: 'FETCH_ACTIVITIES_SUCCESS',
        payload: normalize([], schema.arrayOfActivities),
      };
      const actual = fetchActivitiesSuccess([]);
      expect(isFSA(actual)).to.be.equal(true);
      expect(actual).be.deep.equal(expected);
    });
  });

  describe('fetchActivitiesError', function () {
    it('returns FSA action', function () {
      const expected = {
        type: 'FETCH_ACTIVITIES_ERROR',
        payload: new Error(),
        error: true,
      };
      const actual = fetchActivitiesError();
      expect(isFSA(actual)).to.be.equal(true);
      expect(actual).be.deep.equal(expected);
    });
  });
});
