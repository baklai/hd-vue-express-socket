const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const { toResponse } = require('../models/user.model');

const { BCRYPT_SALT } = require('../config/api.config');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = 'isActive', filters } = payload;
      const items = await User.paginate(
        {},
        {
          lean: true,
          offset: offset,
          limit: Number(limit) === -1 ? await User.countDocuments() : Number(limit),
          sort: sort
        }
      );
      callback({ ...items, docs: items.docs.map(toResponse) });
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await User.findById(payload.id);
      if (item) callback(toResponse(item));
      else callback(404);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const password = await bcrypt.hash(payload.password, BCRYPT_SALT);
      const item = await User.create({ ...payload, password });
      callback(toResponse(item));
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const { password, ...args } = payload;
      const item = password
        ? await User.findByIdAndUpdate(payload.id, {
            ...args,
            password: await bcrypt.hash(password, BCRYPT_SALT)
          })
        : await User.findByIdAndUpdate(payload.id, { ...args });

      if (item) callback(toResponse(item));
      else callback(400);
    } catch (error) {
      callback({ error });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await User.deleteOne({ _id: payload.id });
      if (item) callback(item);
      else callback(404);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('user:find:all', findAll);
  socket.on('user:find:one', findOne);
  socket.on('user:create:one', createOne);
  socket.on('user:update:one', updateOne);
  socket.on('user:remove:one', removeOne);
};
