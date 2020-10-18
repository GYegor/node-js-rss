const router = require('express').Router();
const { catchError } = require('../../utils');
const User = require('./user.model');
const usersService = require('./user.service');
const { OK, NOT_FOUND, NO_CONTENT } = require('http-status-codes');

// router.param('id', (req, res, next, id) => {
//   req.params.id = id;

//   next();
// });

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const users = await usersService.getAll();
      res.status(OK).json(users.map(User.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const user = await usersService.create(req.body);
      res.status(OK).json(User.toResponse(user));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const user = await usersService.getById(req.params.id);
      if (user) {
        res.status(OK).json(User.toResponse(user));
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      const oldUser = await usersService.getById(req.params.id);
      if (oldUser) {
        const user = await usersService.update(req.params.id, req.body);
        res.status(OK).json(User.toResponse(user));
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  )
  .delete(
    catchError(async (req, res) => {
      const userToDelete = await usersService.getById(req.params.id);
      if (userToDelete) {
        const userRemoved = await usersService.remove(req.params.id);
        if (userRemoved) {
          res.status(NO_CONTENT).send('User was deleted');
        }
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  );
module.exports = router;
