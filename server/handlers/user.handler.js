const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const { toFindAllResponse, toFindResponse, toResponse } = require('../models/user.model');
const { BCRYPT_SALT } = require('../config');

module.exports = (socket) => {
  const find = async (payload, callback) => {
    try {
      const response = await User.find({});
      callback({ response: response.map(toFindResponse) });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findAll = async (
    { offset = 0, limit = 5, sort = { isActive: -1 }, filters = {} },
    callback
  ) => {
    try {
      const response = await User.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await User.countDocuments() : Number(limit),
          lean: false,
          allowDiskUse: true
        }
      );
      callback({ response: { ...response, docs: response.docs.map(toFindAllResponse) } });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await User.findById(id);
      callback({ response: toResponse(response) });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async ({ password, ...payload }, callback) => {
    try {
      const passwordHash = await bcrypt.hash(password, BCRYPT_SALT);
      const response = await User.create({ ...payload, password: passwordHash });
      callback({ response: toResponse(response) });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, password, ...payload }, callback) => {
    try {
      const response = password
        ? await User.findByIdAndUpdate(id, {
            ...payload,
            password: await bcrypt.hash(password, BCRYPT_SALT)
          })
        : await User.findByIdAndUpdate(id, { ...payload });
      callback({ response: toResponse(response) });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await User.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('user:find', find);
  socket.on('user:find:all', findAll);
  socket.on('user:find:one', findOne);
  socket.on('user:create:one', createOne);
  socket.on('user:update:one', updateOne);
  socket.on('user:remove:one', removeOne);
};
