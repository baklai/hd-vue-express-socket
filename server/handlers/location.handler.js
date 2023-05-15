const Location = require('../models/location.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const response = await Location.find({});
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Location.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Location.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Location.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Location.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('location:find:all', findAll);
  socket.on('location:find:one', findOne);
  socket.on('location:create:one', createOne);
  socket.on('location:update:one', updateOne);
  socket.on('location:remove:one', removeOne);
};
