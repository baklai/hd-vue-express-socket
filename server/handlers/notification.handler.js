const Notification = require('../models/notification.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = 'createdAt', filters } = payload;
      const items = await Notification.paginate(
        { ...filters },
        {
          lean: false,
          offset: offset,
          limit: Number(limit) === -1 ? await Notification.countDocuments() : Number(limit),
          sort: sort
        }
      );
      // const items = await Notification.find({ userID: payload.id });
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createMany = async (payload, callback) => {
    try {
      const { title, text, users } = payload;
      await users.forEach((el) => {
        Notification.create({
          title,
          text,
          userID: el
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
