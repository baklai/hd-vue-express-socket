const Logger = require('../models/logger.model');

module.exports = (socket) => {
  const findAll = async (
    { offset = 0, limit = 5, sort = { datetime: -1 }, filters = {} },
    callback
  ) => {
    try {
      const response = await Logger.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await Logger.countDocuments() : Number(limit),
          lean: false,
          allowDiskUse: true
        }
      );
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id }, callback) => {
    try {
      const response = await Logger.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Logger.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeAll = async (payload, callback) => {
    try {
      const response = await Logger.deleteMany({});
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('logger:find:all', findAll);
  socket.on('logger:find:one', findOne);
  socket.on('logger:remove:one', removeOne);
  socket.on('logger:remove:all', removeAll);
};
