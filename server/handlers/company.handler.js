const Сompany = require('../models/company.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await Сompany.find({});
      callback(items);
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Сompany.findById(payload.id);
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Сompany.create({ ...payload });
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Сompany.findByIdAndUpdate(payload.id, {
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
      const item = await Сompany.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('company:find:all', findAll);
  socket.on('company:find:one', findOne);
  socket.on('company:create:one', createOne);
  socket.on('company:update:one', updateOne);
  socket.on('company:remove:one', removeOne);
};
