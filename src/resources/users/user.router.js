const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.param('id', (req, res, next, id) => {
  req.id = id;
  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const users = await usersService.getAll();
    const newUser = new User(req.body);
    users.push(newUser);
    res.json({ id: newUser.id });
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.getById(req.id);
    res.json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const id = await usersService.update(req.id, req.body);
    res.json({ id });
  })
  .delete(async (req, res) => {
    await usersService.remove(req.id);
    res.sendStatus(204);
  });

module.exports = router;
