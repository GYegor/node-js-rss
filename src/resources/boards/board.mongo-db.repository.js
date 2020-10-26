const Board = require('./board.model');

const getAll = async () => Board.find({});

const getById = async id => Board.findOne({ _id: id });

const create = async body => Board.create(body);

const update = async (id, body) => Board.updateOne({ _id: id }, body);

const remove = async id => (await Board.deleteOne({ _id: id })).ok;

module.exports = { getAll, getById, create, update, remove };
