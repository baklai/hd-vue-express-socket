const Position = require('../models/position.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Position.find({});
      callback(items);
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Position.findById(payload.id);
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Position.create({ ...payload });
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Position.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload
        }
      });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await Position.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('position:find:all', findAll);
  socket.on('position:find:one', findOne);
  socket.on('position:create:one', createOne);
  socket.on('position:update:one', updateOne);
  socket.on('position:remove:one', removeOne);
};
