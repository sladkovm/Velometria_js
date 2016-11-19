import { expect } from 'chai';
import { isFSA } from 'flux-standard-action';

import { setCurrentPage } from './page.js';

describe('actions: page.js', function () {
  describe('setCurrentPage', function () {
    it('returns FSA action', function () {
      const currentPage = 3;
      const expected = {
        type: 'SET_CURRENT_PAGE',
        payload: currentPage,
      };
      const actual = setCurrentPage(currentPage);
      expect(isFSA(actual)).to.be.equal(true);
      expect(actual).be.deep.equal(expected);
    });
  });
});
