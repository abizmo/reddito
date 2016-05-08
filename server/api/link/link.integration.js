'use strict';

var app = require('../..');
import request from 'supertest';

var newLink;

describe('Link API:', function() {

  describe('GET /api/links', function() {
    var links;

    beforeEach(function(done) {
      request(app)
        .get('/api/links')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          links = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      links.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/links', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/links')
        .send({
          name: 'New Link',
          info: 'This is the brand new link!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLink = res.body;
          done();
        });
    });

    it('should respond with the newly created link', function() {
      newLink.name.should.equal('New Link');
      newLink.info.should.equal('This is the brand new link!!!');
    });

  });

  describe('GET /api/links/:id', function() {
    var link;

    beforeEach(function(done) {
      request(app)
        .get('/api/links/' + newLink._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          link = res.body;
          done();
        });
    });

    afterEach(function() {
      link = {};
    });

    it('should respond with the requested link', function() {
      link.name.should.equal('New Link');
      link.info.should.equal('This is the brand new link!!!');
    });

  });

  describe('PUT /api/links/:id', function() {
    var updatedLink;

    beforeEach(function(done) {
      request(app)
        .put('/api/links/' + newLink._id)
        .send({
          name: 'Updated Link',
          info: 'This is the updated link!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLink = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLink = {};
    });

    it('should respond with the updated link', function() {
      updatedLink.name.should.equal('Updated Link');
      updatedLink.info.should.equal('This is the updated link!!!');
    });

  });

  describe('DELETE /api/links/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/links/' + newLink._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when link does not exist', function(done) {
      request(app)
        .delete('/api/links/' + newLink._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
