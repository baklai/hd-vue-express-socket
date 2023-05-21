const Notification = require('../models/notification.model');

module.exports = (socket) => {
  const findAll = async (
    { offset = 0, limit = 5, sort = { createdAt: -1 }, filters = {} },
    callback
  ) => {
    try {
      const response = await Notification.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await Notification.countDocuments() : Number(limit),
          lean: false,
          allowDiskUse: true
        }
      );
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async ({ title, text, userID }, callback) => {
    try {
      await Notification.create({ title, text, userID });
      callback({ response: 'Ok' });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Notification.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('notification:find:all', findAll);
  socket.on('notification:create:one', createOne);
  socket.on('notification:remove:one', removeOne);
};
