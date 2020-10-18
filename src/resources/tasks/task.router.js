const router = require('express').Router({ mergeParams: true });
const { catchError } = require('../../utils');
const tasksService = require('./task.service');
const { OK, NOT_FOUND, NO_CONTENT } = require('http-status-codes');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const tasks = await tasksService.getAllAtBoard(req.params.boardId);
      res.status(OK).json(tasks);
    })
  )
  .post(
    catchError(async (req, res) => {
      const task = await tasksService.addToBoard(req.params.boardId, req.body);
      res.status(OK).json(task);
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const task = await tasksService.getByIdAtBoard(
        req.params.boardId,
        req.params.id
      );
      if (task) {
        res.status(OK).json(task);
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      const oldTask = await tasksService.getByIdAtBoard(
        req.params.boardId,
        req.params.id
      );
      if (oldTask) {
        const task = await tasksService.updateAtBoard(
          req.params.boardId,
          req.params.id,
          req.body
        );
        res.status(OK).json(task);
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  )
  .delete(
    catchError(async (req, res) => {
      const taskToDelete = await tasksService.getByIdAtBoard(
        req.params.boardId,
        req.params.id
      );
      if (taskToDelete) {
        const taskRemoved = await tasksService.removeFromBoard(
          req.params.boardId,
          req.params.id
        );
        if (taskRemoved) {
          res.status(NO_CONTENT).send('Task was deleted');
        }
      } else {
        res.sendStatus(NOT_FOUND);
      }
    })
  );

module.exports = router;
