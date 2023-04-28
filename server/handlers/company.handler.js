const Сompany = require('../models/company.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Сompany.find({});
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Сompany.findById(payload.id);
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Сompany.create({ ...payload });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Сompany.findByIdAndUpdate(payload.id, {
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
      const item = await Сompany.deleteOne({ _id: payload.id });
      callback({ response: item });
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
