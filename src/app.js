/* eslint-disable no-unreachable */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');
const errorHandler = require('./middlewares/errorHandler');
const tokenChecker = require('./middlewares/tokenChecker');
const { logger, requestResponseLogger } = require('./middlewares/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(requestResponseLogger);

app.use(tokenChecker);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running! Yo comrades!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

process.on('unhandledRejection', err => {
  logger.error(`${err.message}`);
  process.exitCode = 1;
});

process.on('uncaughtException', err => {
  logger.error(err.message);
  process.exitCode = 1;
});

module.exports = app;
