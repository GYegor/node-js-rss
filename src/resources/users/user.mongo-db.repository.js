const User = require('./user.model');

const getAll = async () => User.find({});

const getById = async id => User.findOne({ _id: id });

const getByCreds = async userCreds => User.findOne(userCreds);

const create = async body => User.create(body);

const update = async (id, body) => User.updateOne({ _id: id }, body);

const remove = async id => (await User.deleteOne({ _id: id })).ok;

module.exports = { getAll, getById, getByCreds, create, update, remove };
