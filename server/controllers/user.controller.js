const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const { toResponse } = require('../models/user.model');

const { BCRYPT_SALT } = require('../config/api.config');

const findAll = async (req, res, next) => {
  try {
    const { offset = 0, limit = 5, sort = 'isActive', filters } = req.query;
    const items = await User.paginate(
      {},
      {
        lean: true,
        offset: offset,
        limit: Number(limit) === -1 ? await User.countDocuments() : Number(limit),
        sort: sort
      }
    );
    res.status(200).json({ ...items, docs: items.docs.map(toResponse) });
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const item = await User.findById(req.params.id);
    if (item) res.status(200).json(toResponse(item));
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, BCRYPT_SALT);
    const item = await User.create({ ...req.body, password });
    res.status(200).json(toResponse(item));
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const password = req.body.password ? await bcrypt.hash(req.body.password, BCRYPT_SALT) : false;
    const item = password
      ? await User.findByIdAndUpdate(req.params.id, {
          ...req.body,
          password
        })
      : await User.findByIdAndUpdate(req.params.id, {
          ...req.body
        });

    //  const { password, ...args } = payload;
    //  const item = password
    //      ? await User.findByIdAndUpdate(payload.id, {
    //            ...args,
    //            password: await bcrypt.hash(password, BCRYPT_SALT)
    //        })
    //      : await User.findByIdAndUpdate(payload.id, { ...args });

    //  if (item) callback(toResponse(item));

    if (item) res.status(200).json(toResponse(item));
    else res.sendStatus(400);
  } catch (err) {
    next(err);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const item = await User.deleteOne({ _id: req.params.id });
    if (item) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };
