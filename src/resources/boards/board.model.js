const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(), // * вообще это делается на уровне бд
    title = 'Board',
    columns = [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
