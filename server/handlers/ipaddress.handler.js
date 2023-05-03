const Netmask = require('netmask').Netmask;

const IPAddress = require('../models/ipaddress.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = 'indexip', filters } = payload;

      const items = await IPAddress.paginate(
        { ...filters },
        {
          lean: false,
          offset: offset,
          limit: Number(limit) === -1 ? await IPAddress.countDocuments() : Number(limit),
          // select: '-internet -email',
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
      const populate = payload?.populate === 'false' ? false : true;
      const item = await IPAddress.findById(payload.id, null, {
        autopopulate: populate
      });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const searchOne = async (payload, callback) => {
    try {
      const item = await IPAddress.findOne({ ipaddress: payload.ipaddress });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const indexip = new Netmask(payload.ipaddress).netLong;
      const item = await IPAddress.create({ ...payload, indexip });
      callback({ response: items });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const indexip = new Netmask(payload.ipaddress).netLong;

      const item = await IPAddress.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload,
          indexip
        }
      });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await IPAddress.deleteOne({ _id: payload.id });
      callback({ response: item });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('ipaddress:find:all', findAll);
  socket.on('ipaddress:find:one', findOne);
  socket.on('ipaddress:search:one', searchOne);
  socket.on('ipaddress:create:one', createOne);
  socket.on('ipaddress:update:one', updateOne);
  socket.on('ipaddress:remove:one', removeOne);
};
