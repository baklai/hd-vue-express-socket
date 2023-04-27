const Unit = require('../models/unit.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Unit.find({});
      callback(items);
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Unit.findById(payload.id);
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Unit.create({ ...payload });
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Unit.findByIdAndUpdate(payload.id, {
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
      const item = await Unit.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('unit:find:all', findAll);
  socket.on('unit:find:one', findOne);
  socket.on('unit:create:one', createOne);
  socket.on('unit:update:one', updateOne);
  socket.on('unit:remove:one', removeOne);
};
