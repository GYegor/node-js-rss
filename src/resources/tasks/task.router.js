const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllAtBoard(req.params.boardId);
    if (!tasks.length) {
      tasks.length = null;
    } else {
      res.json(tasks);
    }
  })
  .post(async (req, res) => {
    const task = await tasksService.addToBoard(
      req.params.boardId !== 'Undefined' ? req.params.boardId : null,
      req.body
    );
    res.json(task);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const task = await tasksService.getByIdAtBoard(
        req.params.boardId,
        req.params.id
      );
      if (task) {
        res.json(task);
      } else {
        res.json({});
      }
    } catch {
      res.statusCode(404);
    }
  })
  .put(async (req, res) => {
    try {
      const updatedTask = await tasksService.updateAtBoard(
        req.params.boardId,
        req.params.id,
        req.body
      );
      res.json(updatedTask);
    } catch {
      res.statusCode(404);
    }
  })
  .delete(async (req, res) => {
    await tasksService.removeFromBoard(req.params.boardId, req.params.id);
    res.sendStatus(204);
  });

module.exports = router;
