'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var linkCtrlStub = {
  index: 'linkCtrl.index',
  show: 'linkCtrl.show',
  create: 'linkCtrl.create',
  update: 'linkCtrl.update',
  destroy: 'linkCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var linkIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './link.controller': linkCtrlStub
});

describe('Link API Router:', function() {

  it('should return an express router instance', function() {
    linkIndex.should.equal(routerStub);
  });

  describe('GET /api/links', function() {

    it('should route to link.controller.index', function() {
      routerStub.get
        .withArgs('/', 'linkCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/links/:id', function() {

    it('should route to link.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'linkCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/links', function() {

    it('should route to link.controller.create', function() {
      routerStub.post
        .withArgs('/', 'linkCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/links/:id', function() {

    it('should route to link.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'linkCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/links/:id', function() {

    it('should route to link.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'linkCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/links/:id', function() {

    it('should route to link.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'linkCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
