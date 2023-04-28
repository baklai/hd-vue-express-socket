const Enterprise = require('../models/enterprise.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Enterprise.find({});
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Enterprise.findById(payload.id);
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Enterprise.create({ ...payload });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Enterprise.findByIdAndUpdate(payload.id, {
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
      const item = await Enterprise.deleteOne({ _id: payload.id });
      callback({ response: item });
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
