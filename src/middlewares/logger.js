const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  exitOnError: false,
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transport: [
    new transports.Console(),
    new transports.File({
      filename: '../log/pseudoTrello.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: '../log/pseudoTrello.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: './log/pseudoTrello.log' })
  ]
});

logger.exceptions.handle(new transports.File({ filename: 'exceptions.log' }));
// logger.silly('silly');
// logger.debug('debug');
// logger.verbose('verbose');
logger.info('info');
// logger.warn('warn');
// logger.error('error');

logger.log('info', 'info');

module.exports = (req, res, next) => {
  logger.info(req.url);

  next();
};
