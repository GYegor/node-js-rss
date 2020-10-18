const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(INTERNAL_SERVER_ERROR).send('Internal server error');
  }

  next();
};

module.exports = errorHandler;
