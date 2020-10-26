const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String
  },
  {
    versionKey: false
  }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = model('User', userSchema);

module.exports = User;
