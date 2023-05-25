const UnSoftware = require('../models/unsoftware.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const response = await UnSoftware.find({});
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await UnSoftware.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await UnSoftware.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await UnSoftware.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await UnSoftware.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('unsoftware:find:all', findAll);
  socket.on('unsoftware:find:one', findOne);
  socket.on('unsoftware:create:one', createOne);
  socket.on('unsoftware:update:one', updateOne);
  socket.on('unsoftware:remove:one', removeOne);
};
