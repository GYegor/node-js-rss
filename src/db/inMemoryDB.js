const User = require('../resources/users/user.model');
const Task = require('../resources/tasks/task.model');
const Board = require('../resources/boards/board.model');

const db = {
  users: [],
  tasks: [],
  boards: []
};

const getRandomIndex = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const initDb = () => {
  for (let i = 0; i < 3; i++) {
    db.users.push(
      new User({
        name: `User-${i + 1}`,
        login: `User's-${i + 1} login`,
        password: Math.random()
          .toString(36)
          .substring(2, 8)
      })
    );
  }
  for (let i = 0; i < 3; i++) {
    db.boards.push(
      new Board({
        title: `Board #${i + 1}`,
        columns: []
      })
    );
  }
  for (let i = 0; i < 9; i++) {
    const userRandomIndex = getRandomIndex(0, db.users.length - 1);
    const boardsRandomIndex = getRandomIndex(0, db.boards.length - 1);
    const userId = db.users[userRandomIndex]
      ? db.users[userRandomIndex].id
      : null;
    const boardId = db.boards[boardsRandomIndex]
      ? db.boards[boardsRandomIndex].id
      : null;
    db.tasks.push(
      new Task({
        title: `Task #${i + 1}`,
        order: i + 1,
        description: 'Lorem ipsum',
        userId,
        boardId,
        columnId: 1
      })
    );
  }
};
initDb();

module.exports = db;
