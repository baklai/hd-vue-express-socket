const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Event must is required'
  },
  datetime: {
    type: Date,
    default: Date.now(),
    required: 'Event datetime must is required'
  },
  description: { type: String, trim: true, default: null },
  eventType: {
    type: String,
    default: 'event',
    enum: ['event', 'meeting', 'deadline', 'holiday', 'birthday']
  }
});

module.exports = model('event', eventSchema);
