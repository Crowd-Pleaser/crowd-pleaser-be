const { Router } = require('express');
const Poll = require('../models/Poll/Poll');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()

  .post('/', (req, res, next) => {
    Poll
      .create(req.body)
      .then(poll => res.send(poll))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Poll
      .find()
      .then(polls => res.send(polls))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Poll
      .findById(req.params.id)
      .then(poll => res.send(poll))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Poll
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(poll => res.send(poll))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Poll
      .findByIdAndDelete(req.params.id)
      .then(poll => res.send(poll))
      .catch(next);
  })
  .patch('/vote/:id', ensureAuth, (req, res, next) => {
    Poll
      .findByIdAndUpdate(req.params.id, { $inc: req.body, $push: { voters: req.user._id } }, { new: true })
      .then(poll => res.send(poll))
      .catch(next);
  });
