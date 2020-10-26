const router = require('express').Router();
const { catchError } = require('../../utils');
const {
  OK,
  NOT_FOUND,
  NO_CONTENT,
  ReasonPhrases
} = require('http-status-codes');
const boardsService = require('./board.service');
const Board = require('./board.model');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boards = await boardsService.getAll();
      res.status(OK).json(boards.map(Board.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const board = await boardsService.create(req.body);
      res.status(OK).json(Board.toResponse(board));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const board = await boardsService.getById(req.params.id);

      if (board) {
        res.status(OK).json(Board.toResponse(board));
      } else {
        res.status(NOT_FOUND).send(`Board ${ReasonPhrases.NOT_FOUND}`);
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      const oldBoard = await boardsService.getById(req.params.id);
      if (oldBoard) {
        const board = await boardsService.update(req.params.id, req.body);
        res.status(OK).json(Board.toResponse(board));
      } else {
        res.status(NOT_FOUND).send(`Board ${ReasonPhrases.NOT_FOUND}`);
      }
    })
  )
  .delete(
    catchError(async (req, res) => {
      const boardToDelete = await boardsService.getById(req.params.id);
      if (boardToDelete) {
        const boardRemoved = await boardsService.remove(req.params.id);
        if (boardRemoved) {
          res.status(NO_CONTENT).send('Board Was Deleted');
        }
      } else {
        res.status(NOT_FOUND).send(`Board ${ReasonPhrases.NOT_FOUND}`);
      }
    })
  );

module.exports = router;
