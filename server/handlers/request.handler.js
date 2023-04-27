const Request = require('../models/request.model');

module.exports = (socket) => {
  const findAll = async (payload, callback) => {
    try {
      const { offset = 0, limit = 5, sort = 'created', filters } = payload;

      // if (f.workerOpen) filters.workerOpen = f.workerOpen;
      // if (f.workerClose) filters.workerClose = f.workerClose;
      // if (f.location) filters.location = f.location;
      // if (f.position) filters.position = f.position;
      // if (f.company) filters.company = f.company;
      // if (f.branch) filters.branch = f.branch;
      // if (f.enterprise) filters.enterprise = f.enterprise;
      // if (f.department) filters.department = f.department;
      // if (f.ipaddress) filters.ipaddress = { $regex: f.ipaddress, $options: 'i' };
      // if (f.fullname) filters.fullname = { $regex: f.fullname, $options: 'i' };
      // if (f.phone) filters.phone = { $regex: f.phone, $options: 'i' };
      // if (f.mail) filters.mail = { $regex: f.mail, $options: 'i' };
      // if (f.closed) filters.closed = { $ne: null };

      const items = await Request.paginate(
        {},
        {
          lean: false,
          offset: offset,
          limit: Number(limit) === -1 ? await Request.countDocuments() : Number(limit),
          sort: sort
        }
      );

      callback(items);
    } catch (error) {
      callback({ error });
    }
  };

  const findOne = async (payload, callback) => {
    try {
      const populate = payload?.populate === 'false' ? false : true;
      const item = await Request.findById(payload.id, null, {
        autopopulate: populate
      });
      if (item) callback(item);
      else callback(404);
    } catch (error) {
      callback({ error });
    }
  };

  const createOne = async (payload, callback) => {
    try {
      const item = await Request.create({ ...payload });
      callback(item);
    } catch (error) {
      callback({ error });
    }
  };

  const updateOne = async (payload, callback) => {
    try {
      const item = await Request.findByIdAndUpdate(payload.id, {
        $set: {
          ...payload
        }
      });
      if (item) callback(item);
      else callback(400);
    } catch (error) {
      callback({ error });
    }
  };

  const removeOne = async (payload, callback) => {
    try {
      const item = await Request.deleteOne({ _id: payload.id });
      if (item) callback(item);
      else callback(404);
    } catch (error) {
      callback({ error });
    }
  };

  socket.on('request:find:all', findAll);
  socket.on('request:find:one', findOne);
  socket.on('request:create:one', createOne);
  socket.on('request:update:one', updateOne);
  socket.on('request:remove:one', removeOne);
};
