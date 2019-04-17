import Sum from './helpers'
import assert from 'assert';

describe('Sum', function () {
    it('should return the correct sum of two numbers', function () {
      assert.equal(Sum(1,2), 3);
    });
  });