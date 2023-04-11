const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const mongooseAutopopulate = require('mongoose-autopopulate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const mongoosePreSet = require('../plugins/mongoose');
// const User = require('../models/user.model');

mongoose.set('strictQuery', false);

mongoose.plugin(mongoosePreSet);
mongoose.plugin(mongooseUniqueValidator);
mongoose.plugin(mongooseAutopopulate);
mongoose.plugin(mongooseAggregatePaginate);
mongoose.plugin(mongoosePaginate);

const mongodb = async (MONGO_URL, BCRYPT_SALT) => {
  try {
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.info('Success MongoDB connected');
    // await User.setDefaultAdmin(
    //   {
    //     login: 'helpdesk',
    //     password: 'helpdesk',
    //     name: 'Administrator',
    //     email: 'root@helpdesk.io',
    //     isActive: true,
    //     isAdmin: true
    //   },
    //   BCRYPT_SALT
    // );
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(0);
  }
};

module.exports = async (MONGO_URI) => {
  await mongodb(MONGO_URI);
};
