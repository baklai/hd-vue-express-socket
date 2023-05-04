const Notification = require('../models/notification.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = { createdAt: -1 }, filters } = payload;
      const items = await Notification.paginate(
        { ...filters },
        {
          lean: false,
          offset: offset,
          limit: Number(limit) === -1 ? await Notification.countDocuments() : Number(limit),
          sort: sort
        }
      );
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createMany = async ({ title, text, users }, callback) => {
    try {
      await users.forEach((user) => {
        Notification.create({
          title,
          text,
          userID: user
        });
      });
      callback({ response: 'Ok' });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const item = await Notification.deleteOne({ _id: id });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('notification:find:all', findAll);
  socket.on('notification:create:many', createMany);
  socket.on('notification:remove:one', removeOne);
};
