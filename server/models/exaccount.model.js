const { model, Schema } = require('mongoose');

const exaccountSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: 'Exception user account name must is unique',
    required: 'Exception user account name must is required'
  },
  comment: {
    type: String,
    trim: true
  }
});

module.exports = model('exaccount', exaccountSchema);
