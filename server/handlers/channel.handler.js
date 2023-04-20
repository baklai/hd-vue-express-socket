const Channel = require('../models/channel.model');

module.exports = (io, socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = 'locationFrom', filters } = payload;
      const items = await Channel.paginate(
        {},
        {
          lean: false,
          offset: offset,
          limit: Number(limit) === -1 ? await Channel.countDocuments() : Number(limit),
          sort: sort
        }
      );
      callback(items);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const item = await Channel.findById(id);
      callback(item);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Channel.create({ ...payload });
      callback(item);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Channel.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload
        }
      });
      if (item) callback(item);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await Channel.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('channel:find:all', findAll);
  socket.on('channel:find:one', findOne);
  socket.on('channel:create:one', createOne);
  socket.on('channel:update:one', updateOne);
  socket.on('channel:remove:one', removeOne);
};
