const Enterprise = require('../models/enterprise.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const response = await Enterprise.find({});
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Enterprise.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Enterprise.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Enterprise.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Enterprise.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('enterprise:find:all', findAll);
  socket.on('enterprise:find:one', findOne);
  socket.on('enterprise:create:one', createOne);
  socket.on('enterprise:update:one', updateOne);
  socket.on('enterprise:remove:one', removeOne);
};
