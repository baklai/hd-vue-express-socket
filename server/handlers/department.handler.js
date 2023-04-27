const Department = require('../models/department.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Department.find({});
      callback(items);
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Department.findById(payload.id);
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Department.create({ ...payload });
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Department.findByIdAndUpdate(payload.id, {
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
      const item = await Department.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('department:find:all', findAll);
  socket.on('department:find:one', findOne);
  socket.on('department:create:one', createOne);
  socket.on('department:update:one', updateOne);
  socket.on('department:remove:one', removeOne);
};
