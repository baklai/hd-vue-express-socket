const Position = require('../models/position.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const response = await Position.find({});
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Position.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Position.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Position.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Position.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('position:find:all', findAll);
  socket.on('position:find:one', findOne);
  socket.on('position:create:one', createOne);
  socket.on('position:update:one', updateOne);
  socket.on('position:remove:one', removeOne);
};
