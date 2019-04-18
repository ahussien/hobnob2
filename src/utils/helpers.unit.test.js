import Sum from './helpers'
import assert from 'assert';
import { spy } from 'sinon';

describe('Sum', function () {
    it('should return the correct sum of two numbers', function () {
      const next = spy();
      next();
      assert(next.calledOnce);

    });

    it('should return the correct sum of two numbers', function () {
      assert.equal(Sum(1,2), 3);
    });  
  });