const Request = require('../models/request.model');

module.exports = (socket) => {
  const findAll = async (
    { offset = 0, limit = 5, sort = { createdAt: -1 }, filters = {} },
    callback
  ) => {
    try {
      const response = await Request.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await Request.countDocuments() : Number(limit),
          lean: false,
          allowDiskUse: true
        }
      );
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id, populate = false }, callback) => {
    try {
      const response = await Request.findById(id, null, { autopopulate: populate });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Request.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Request.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Request.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('request:find:all', findAll);
  socket.on('request:find:one', findOne);
  socket.on('request:create:one', createOne);
  socket.on('request:update:one', updateOne);
  socket.on('request:remove:one', removeOne);
};
