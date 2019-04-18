import assert from 'assert';
import { spy, stub } from 'sinon';
import  create from './create'

const createStubs = {
    success: stub().resolves({ _id: 'foo'}),
    otherError: stub().rejects(new Error()),
  }

describe('create', function () {
    it('should return the correct sum of two numbers', function () {
      const next = spy();
      next();
      assert(next.calledOnce);

    });

    it('should return the correct sum of two numbers', function () {
      assert.equal(Sum(1,2), 3);
    });  
  });