const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { PATH_WHITE_LIST } = require('../utils');
const { UNAUTHORIZED, ReasonPhrases } = require('http-status-codes');

const checkToken = (req, res, next) => {
  if (PATH_WHITE_LIST.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer') {
    res.status(UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
  } else {
    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        return res.status(UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
      }
      return next();
    });
  }
};

module.exports = checkToken;
