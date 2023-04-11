const { model, Schema } = require('mongoose');

const unitSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: 'Unit must is unique',
    required: 'Unit must is required'
  }
});

module.exports = model('unit', unitSchema);
