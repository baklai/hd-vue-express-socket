const Сompany = require('../models/company.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const response = await Сompany.find({});
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Сompany.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Сompany.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Сompany.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Сompany.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('company:find:all', findAll);
  socket.on('company:find:one', findOne);
  socket.on('company:create:one', createOne);
  socket.on('company:update:one', updateOne);
  socket.on('company:remove:one', removeOne);
};
