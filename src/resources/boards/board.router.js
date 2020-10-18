const router = require('express').Router();
const { catchError } = require('../../utils');
const boardsService = require('./board.service');
const { OK, NOT_FOUND, NO_CONTENT } = require('http-status-codes');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boards = await boardsService.getAll();
      res.status(OK).json(boards);
    })
  )
  .post(
    catchError(async (req, res) => {
      const board = await boardsService.create(req.body);
      res.status(OK).json(board);
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const board = await boardsService.getById(req.params.id);
      if (board) {
        res.status(OK).json(board);
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      const oldBoard = await boardsService.getById(req.params.id);
      if (oldBoard) {
        const board = await boardsService.update(req.params.id, req.body);
        res.status(OK).json(board);
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  )
  .delete(
    catchError(async (req, res) => {
      const boardToDelete = await boardsService.getById(req.params.id);
      if (boardToDelete) {
        const boardRemoved = await boardsService.remove(req.params.id);
        if (boardRemoved) {
          res.status(NO_CONTENT).send('User was deleted');
        }
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  );

module.exports = router;
