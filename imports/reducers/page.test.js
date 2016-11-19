import { expect } from 'chai';

import { currentPage } from './page';

describe('reducers: page.js', function () {
  describe('currentPage', function () {
    it('returns current page', function () {
      const testAction = {
        type: 'SET_CURRENT_PAGE',
        payload: 3,
      };
      const expected = 3;
      const actual = currentPage(0, testAction);
      expect(actual).to.be.equal(expected);
    });
  });
});
