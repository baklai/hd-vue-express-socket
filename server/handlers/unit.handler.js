const Unit = require('../models/unit.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const response = await Unit.find({});
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Unit.findById(payload.id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Unit.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Unit.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Unit.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('unit:find:all', findAll);
  socket.on('unit:find:one', findOne);
  socket.on('unit:create:one', createOne);
  socket.on('unit:update:one', updateOne);
  socket.on('unit:remove:one', removeOne);
};
