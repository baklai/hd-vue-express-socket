const Exaccount = require('../models/exaccount.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const response = await Exaccount.find({});
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Exaccount.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Exaccount.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Exaccount.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Exaccount.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('exaccount:find:all', findAll);
  socket.on('exaccount:find:one', findOne);
  socket.on('exaccount:create:one', createOne);
  socket.on('exaccount:update:one', updateOne);
  socket.on('exaccount:remove:one', removeOne);
};
