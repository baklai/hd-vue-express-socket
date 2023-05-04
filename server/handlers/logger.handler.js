const Logger = require('../models/logger.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = '-datetime', filters } = payload;
      const items = await Logger.paginate(
        { ...filters },
        {
          lean: false,
          offset: offset,
          limit: Number(limit) === -1 ? await Logger.countDocuments() : Number(limit),
          sort: sort
        }
      );
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeAll = async (payload, callback) => {
    try {
      const item = await Logger.deleteMany({});
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('logger:find:all', findAll);
  socket.on('logger:remove:all', removeAll);
};
