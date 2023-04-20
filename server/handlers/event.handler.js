const Event = require('../models/event.model');

module.exports = (io, socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { datestart, dateend } = payload;
      const currentDate = new Date();
      const firstDayMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const items = await Event.find({
        date: {
          $gte: datestart || firstDayMonth,
          $lt: dateend || lastDayMonth
        }
      });

      callback(items);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await Event.findById(payload.id);
      callback(item);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Event.create({ ...payload });
      callback(item);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Event.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload
        }
      });
      if (item) callback(item);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await Event.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('event:find:all', findAll);
  socket.on('event:find:one', findOne);
  socket.on('event:create:one', createOne);
  socket.on('event:update:one', updateOne);
  socket.on('event:remove:one', removeOne);
};
