const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: {
      type: String,
      required: true
    },
    userId: String,
    boardId: String,
    columnId: String
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const {
    _id: id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = model('Task', taskSchema);

module.exports = Task;
