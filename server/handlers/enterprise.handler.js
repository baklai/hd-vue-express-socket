const Enterprise = require('../models/enterprise.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Enterprise.find({});
      callback(items);
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Enterprise.findById(payload.id);
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Enterprise.create({ ...payload });
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Enterprise.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload
        }
      });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await Enterprise.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('enterprise:find:all', findAll);
  socket.on('enterprise:find:one', findOne);
  socket.on('enterprise:create:one', createOne);
  socket.on('enterprise:update:one', updateOne);
  socket.on('enterprise:remove:one', removeOne);
};
