const { createLogger, format, transports } = require('winston');
const { finished } = require('stream');

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: 'log/app.log',
      level: 'info'
    }),
    new transports.File({
      filename: 'log/error.log',
      level: 'error'
    })
  ]
});

const requestResponseLogger = (req, res, next) => {
  const { url, method, query, body } = req;
  const start = Date.now();
  logger.info(
    `Req: ${method} URL: ${url}, query parameters: ${JSON.stringify(
      query
    )}, request body: ${JSON.stringify(body)}`
  );

  // eslint-disable-next-line callback-return
  next();

  finished(res, () => {
    const { statusCode, statusMessage } = res;
    const ms = Date.now() - start;
    if (statusCode < 400) {
      logger.info(
        `Res: ${method} ${url} ${statusCode} ${statusMessage} [${ms}ms]`
      );
    } else {
      logger.error(
        `Res: ${method} ${url} ${statusCode} ${statusMessage}! [${ms}ms]`
      );
    }
  });
};

module.exports = {
  requestResponseLogger,
  logger
};
