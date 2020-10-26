const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [
      {
        _id: {
          type: String,
          default: uuid
        },
        title: String,
        order: Number
      }
    ]
  },
  {
    versionKey: false
  }
);

boardSchema.statics.toResponse = board => {
  const { _id: id, title, columns } = board;

  return { id, title, columns };
};

const Board = model('Board', boardSchema);

module.exports = Board;
