const Ticket = require('../models/ticket.model');

module.exports = (socket) => {
  const findAll = async ({ offset = 0, limit = 5, sort = { created: 1 }, filters = {} }, callback) => {
    try {
      const response = await Ticket.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await Ticket.countDocuments() : Number(limit),
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
      const response = await Ticket.findById(id, null, { autopopulate: populate });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await Ticket.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await Ticket.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await Ticket.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('ticket:find:all', findAll);
  socket.on('ticket:find:one', findOne);
  socket.on('ticket:create:one', createOne);
  socket.on('ticket:update:one', updateOne);
  socket.on('ticket:remove:one', removeOne);
};
