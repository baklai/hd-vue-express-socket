const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  login: {
    type: String,
    trim: true,
    unique: 'User login must is unique',
    required: 'User login must is required'
  },
  password: {
    type: String,
    trim: true,
    minLength: 4,
    required: 'User password must is required'
  },
  fullname: {
    type: String,
    trim: true,
    required: 'User name must is required'
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: 'User email must is unique',
    required: 'User email must is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    trim: true,
    required: true,
    default: '+xx(xxx)xxx-xx-xx'
  },
  isActive: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  scope: { type: Array, default: [] }
});

userSchema.statics.toFindAllResponse = function (user) {
  return {
    id: user._id.toString(),
    login: user.login,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    isActive: user.isActive,
    isAdmin: user.isAdmin,
    scope: user?.scope?.length || 0
  };
};

userSchema.statics.toFindResponse = function (user) {
  return {
    id: user._id.toString(),
    login: user.login,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone
  };
};

userSchema.statics.toResponse = function (user) {
  return {
    id: user._id.toString(),
    login: user.login,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    isActive: user.isActive,
    isAdmin: user.isAdmin,
    scope: user.scope
  };
};

userSchema.statics.toToken = function (user) {
  return {
    id: user._id.toString(),
    login: user.login,
    isActive: user.isActive,
    isAdmin: user.isAdmin
  };
};

userSchema.statics.toSocket = function (user) {
  return {
    id: user._id.toString(),
    login: user.login,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    isActive: user.isActive,
    isAdmin: user.isAdmin,
    scope: user.scope
  };
};

module.exports = model('user', userSchema);
