const { INTERNAL_SERVER_ERROR, ReasonPhrases } = require('http-status-codes');
const { logger } = require('../middlewares/logger');

const errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error(
      `${INTERNAL_SERVER_ERROR} ${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${err.message}`
    );
    res.status(INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
  next(err);
};

module.exports = errorHandler;
