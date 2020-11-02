const router = require('express').Router();
const loginService = require('./login.service');
const { catchError } = require('../../utils');

const { OK, FORBIDDEN } = require('http-status-codes');

router.route('/').post(
  catchError(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.signToken({ login, password });

    if (!token) {
      res.status(FORBIDDEN).send('Wrong login/password');
    } else {
      res.status(OK).json({ token });
    }
  })
);

module.exports = router;
