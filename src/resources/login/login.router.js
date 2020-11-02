const router = require('express').Router();
const loginService = require('./login.service');

const { OK, FORBIDDEN } = require('http-status-codes');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const token = await loginService.signToken({ login, password });

  if (!token) {
    res.status(FORBIDDEN).send('Wrong login/password');
  } else {
    res.status(OK).json(token);
  }
});

module.exports = router;
