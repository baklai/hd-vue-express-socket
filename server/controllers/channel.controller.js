const Channel = require('../models/channel.model');

const findAll = async (req, res, next) => {
  try {
    const { offset = 0, limit = 5, ...filters } = req.query;

    const options = {};

    options.offset = offset;

    if (Number(limit) === -1) {
      options.limit = await Channel.countDocuments();
    } else {
      options.limit = Number(limit);
    }

    options.lean = true;
    options.sort = '-createdAt'; // o.sortBy ? [o.sortBy, o.sortDesc] : 'createdAt';
    options.select = '';

    // const filters = {};

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

    // const items = await Channel.paginate({ ...filters }, { ...options });
    const items = await Channel.paginate({}, { ...options });
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const item = await Channel.findById(req.params.id);
    if (item) res.status(200).json(item);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const item = await Channel.create({ ...req.body });
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const item = await Channel.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body
      }
    });
    if (item) res.status(200).json(item);
    else res.sendStatus(400);
  } catch (err) {
    next(err);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const item = await Channel.deleteOne({ _id: req.params.id });
    if (item) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };