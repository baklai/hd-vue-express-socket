const { model, Schema } = require('mongoose');

const unsoftwareSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: 'Unwanted software name must is unique',
    required: 'Unwanted software name must is required'
  },
  comment: {
    type: String,
    trim: true
  }
});

module.exports = model('unsoftware', unsoftwareSchema);
