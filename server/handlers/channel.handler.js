const Channel = require('../models/channel.model');

module.exports = (socket) => {
  const findAll = async (
    { offset = 0, limit = 5, sort = { locationFrom: 1 }, filters = {} },
    callback
  ) => {
    try {
      const response = await Channel.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await Channel.countDocuments() : Number(limit),
          lean: false,
          allowDiskUse: true
        }
      );
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Channel.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Channel.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Channel.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Channel.deleteOne({ _id: id });
      callback({ response });
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
