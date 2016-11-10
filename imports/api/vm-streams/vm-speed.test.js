import { expect } from 'chai';
import { mps2kph } from './vm-speed.js';

describe('mps2kph', function() {
  it('converts array of mps to array of kph [1.0, 10.0] => [3.6, 36.0]', function() {
    expect(mps2kph([1.0, 10.0])).deep.equal([3.6, 36.0]);
  });
});
