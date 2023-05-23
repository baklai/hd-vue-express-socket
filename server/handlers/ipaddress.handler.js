const Netmask = require('netmask').Netmask;

const IPAddress = require('../models/ipaddress.model');

module.exports = (socket) => {
  const findAll = async (
    { offset = 0, limit = 5, sort = { indexip: 1 }, filters = {} },
    callback
  ) => {
    try {
      if (filters?.internet) {
        switch (filters?.internet['$regex']) {
          case '^opened$':
            filters['internet.mail'] = { $ne: null };
            filters['internet.dateOpen'] = { $ne: null };
            filters['internet.dateClose'] = null;
            break;
          case '^closed$':
            filters['internet.mail'] = null;
            filters['internet.dateOpen'] = null;
            filters['internet.dateClose'] = { $ne: null };
            break;
          case '^missing$':
            filters['internet.mail'] = null;
            filters['internet.dateOpen'] = null;
            filters['internet.dateClose'] = null;
            break;
        }
        delete filters.internet;
      }

      if (filters?.email) {
        switch (filters?.email['$regex']) {
          case '^opened$':
            filters['email.login'] = { $ne: null };
            filters['email.mail'] = { $ne: null };
            filters['email.dateOpen'] = { $ne: null };
            filters['email.dateClose'] = null;
            break;
          case '^closed$':
            filters['email.login'] = { $ne: null };
            filters['email.mail'] = { $ne: null };
            filters['email.dateOpen'] = { $ne: null };
            filters['email.dateClose'] = { $ne: null };
            break;
          case '^missing$':
            filters['email.login'] = null;
            filters['email.mail'] = null;
            filters['email.dateOpen'] = null;
            filters['email.dateClose'] = null;
            break;
        }
        delete filters.email;
      }

      const response = await IPAddress.paginate(
        { ...filters },
        {
          sort,
          offset,
          limit: Number(limit) === -1 ? await IPAddress.countDocuments() : Number(limit),
          lean: false,
          allowDiskUse: true
        }
      );
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const findOne = async ({ id, ipaddress, populate = false }, callback) => {
    try {
      let response = {};
      if (id) {
        response = await IPAddress.findById(id, null, { autopopulate: populate });
      } else if (ipaddress) {
        response = await IPAddress.findOne({ ipaddress }, null, { autopopulate: populate });
      }
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const createOne = async ({ ipaddress, ...payload }, callback) => {
    try {
      const indexip = new Netmask(ipaddress).netLong;
      const response = await IPAddress.create({ ipaddress, indexip, ...payload });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const updateOne = async ({ id, ipaddress, ...payload }, callback) => {
    try {
      const indexip = new Netmask(ipaddress).netLong;
      const response = await IPAddress.findByIdAndUpdate(id, {
        $set: { ipaddress, indexip, ...payload }
      });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const removeOne = async ({ id }, callback) => {
    try {
      const response = await IPAddress.deleteOne({ _id: id });
      callback({ response });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('ipaddress:find:all', findAll);
  socket.on('ipaddress:find:one', findOne);
  socket.on('ipaddress:create:one', createOne);
  socket.on('ipaddress:update:one', updateOne);
  socket.on('ipaddress:remove:one', removeOne);
};
