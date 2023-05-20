module.exports = (schema, options) => {
  schema.set('autoCreate', false);
  schema.set('versionKey', false);
  schema.set('timestamps', true);

  schema.virtual('id').get(function () {
    return this._id;
  });

  schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
      delete ret._id;
    }
  });

  schema.set('toObject', {
    virtuals: true,
    transform: function (doc, ret, options) {
      delete ret._id;
    }
  });
};
