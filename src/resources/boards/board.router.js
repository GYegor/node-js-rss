const router = require('express').Router();
const boardsService = require('./board.service');

router.param('id', (req, res, next, id) => {
  req.id = id;
  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const board = await boardsService.add(req.body);
    res.json(board);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const board = await boardsService.getById(req.id);
      res.json(board);
    } catch {
      res.sendStatus(404);
    }
  })
  .put(async (req, res) => {
    try {
      const updatedBoard = await boardsService.update(req.params.id, req.body);
      res.json(updatedBoard);
    } catch {
      res.sendStatus(404);
    }
  })
  .delete(async (req, res) => {
    try {
      await boardsService.remove(req.id);
      await boardsService.clearBoardTasks(req.id);
      res.sendStatus(204);
    } catch {
      res.sendStatus(404);
    }
  });

module.exports = router;
