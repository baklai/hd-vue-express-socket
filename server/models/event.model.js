const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Event must is required'
  },
  date: {
    type: Date,
    required: 'Event date start must is required'
  },
  href: {
    type: String,
    trim: true,
    default: null
  },
  comment: { type: String, trim: true, default: null }
});

eventSchema.virtual('start').get(function () {
  return this.date;
});

module.exports = model('event', eventSchema);
