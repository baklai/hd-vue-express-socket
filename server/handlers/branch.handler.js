const Branch = require('../models/branch.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Branch.find({});
      callback(items);
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Branch.findById(payload.id);
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Branch.create({ ...payload });
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Branch.findByIdAndUpdate(payload.id, {
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
      const item = await Branch.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('branch:find:all', findAll);
  socket.on('branch:find:one', findOne);
  socket.on('branch:create:one', createOne);
  socket.on('branch:update:one', updateOne);
  socket.on('branch:remove:one', removeOne);
};
