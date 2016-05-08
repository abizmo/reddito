/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/links              ->  index
 * POST    /api/links              ->  create
 * GET     /api/links/:id          ->  show
 * PUT     /api/links/:id          ->  update
 * DELETE  /api/links/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Link from './link.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Links
export function index(req, res) {
  return Link.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Link from the DB
export function show(req, res) {
  return Link.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Link in the DB
export function create(req, res) {
  return Link.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Link in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  console.log(req.params.id);
  console.log(req.body);
  return Link.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Link from the DB
export function destroy(req, res) {
  return Link.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
