const VPN = require('../models/vpn.model');

module.exports = (socket) => {
  const findAll = async (
    { offset = 0, limit = 5, sort = { dateOpen: -1 }, filters = {} },
    callback
  ) => {
    try {
      const response = await VPN.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await VPN.countDocuments() : Number(limit),
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
      const response = await VPN.findById(id);
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const response = await VPN.create({ ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ...payload }, callback) => {
    try {
      const response = await VPN.findByIdAndUpdate(id, { $set: { ...payload } });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await VPN.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('vpn:find:all', findAll);
  socket.on('vpn:find:one', findOne);
  socket.on('vpn:create:one', createOne);
  socket.on('vpn:update:one', updateOne);
  socket.on('vpn:remove:one', removeOne);
};
