const Event = require('../models/event.model');

module.exports = (socket) => {
  const findAll = async ({ offset = 0, limit = 5, sort = { datetime: -1 }, filters = {} }, callback) => {
    try {
      const response = await Event.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await Event.countDocuments() : Number(limit),
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
      const response = await Event.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Event.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Event.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Event.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('event:find:all', findAll);
  socket.on('event:find:one', findOne);
  socket.on('event:create:one', createOne);
  socket.on('event:update:one', updateOne);
  socket.on('event:remove:one', removeOne);
};
