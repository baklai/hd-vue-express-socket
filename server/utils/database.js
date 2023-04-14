const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const mongooseAutopopulate = require('mongoose-autopopulate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const mongoosePreSet = require('../plugins/mongoose');

mongoose.set('strictQuery', false);

mongoose.plugin(mongoosePreSet);
mongoose.plugin(mongooseUniqueValidator);
mongoose.plugin(mongooseAutopopulate);
mongoose.plugin(mongooseAggregatePaginate);
mongoose.plugin(mongoosePaginate);

const mongodb = async (MONGO_URL) => {
  try {
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.info('Success MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(0);
  }
};

module.exports = async (MONGO_URI) => {
  await mongodb(MONGO_URI);
};
