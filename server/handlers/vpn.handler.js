const VPN = require('../models/vpn.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = { created: -1 }, filters } = payload;
      const items = await VPN.paginate(
        { ...filters },
        {
          lean: true,
          offset: offset,
          limit: Number(limit) === -1 ? await VPN.countDocuments() : Number(limit),
          sort: sort
        }
      );

      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await VPN.findById(payload.id);
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await VPN.create({ ...payload });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await VPN.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload
        }
      });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await VPN.deleteOne({ _id: payload.id });
      callback({ response: item });
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
