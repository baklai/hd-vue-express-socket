const Unit = require('../models/unit.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Unit.find({});
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Unit.findById(payload.id);
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Unit.create({ ...payload });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Unit.findByIdAndUpdate(payload.id, {
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
      const item = await Unit.deleteOne({ _id: payload.id });
      callback({ response: item });
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
