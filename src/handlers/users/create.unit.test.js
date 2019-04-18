import assert from 'assert';
import { spy, stub } from 'sinon';
import  create from './create'

const createStubs = {
    success: stub().resolves({ _id: 'foo'}),
    otherError: stub().rejects(new Error()),
  }
  const req= spy();
  const res= {
    status:spy(),
    set:spy(),
    send:spy(),
    json:spy()

  }
  const db= spy();

  describe("When create resolves with the new user's ID", function () {
    beforeEach(function () {
      create(req, res, db, createStubs.success);
    });

    it('should call res.status() once', function () {
      assert(res.status.calledOnce);
    });
  });