const VPN = require('../models/vpn.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const items = await VPN.find({});
      callback(items);
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const item = await VPN.findById(payload.id);
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await VPN.create({ ...payload });
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await VPN.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload
        }
      });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await VPN.deleteOne({ _id: payload.id });
      if (item) callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('vpn:find:all', findAll);
  socket.on('vpn:find:one', findOne);
  socket.on('vpn:create:one', createOne);
  socket.on('vpn:update:one', updateOne);
  socket.on('vpn:remove:one', removeOne);
};
