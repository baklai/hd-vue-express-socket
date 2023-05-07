const Event = require('../models/event.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = { datetime: -1 }, filters } = payload;
      const items = await Event.paginate(
        { ...filters },
        {
          lean: false,
          offset: offset,
          limit: Number(limit) === -1 ? await Event.countDocuments() : Number(limit),
          sort: sort
        }
      );
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Event.findById(payload.id);
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Event.create({ ...payload });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Event.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload
        }
      });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await Event.deleteOne({ _id: payload.id });
      callback({ response: item });
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
