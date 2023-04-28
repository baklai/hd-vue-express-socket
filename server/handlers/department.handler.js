const Department = require('../models/department.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Department.find({});
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Department.findById(payload.id);
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Department.create({ ...payload });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Department.findByIdAndUpdate(payload.id, {
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
      const item = await Department.deleteOne({ _id: payload.id });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('department:find:all', findAll);
  socket.on('department:find:one', findOne);
  socket.on('department:create:one', createOne);
  socket.on('department:update:one', updateOne);
  socket.on('department:remove:one', removeOne);
};
