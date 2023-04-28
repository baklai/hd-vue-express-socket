const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const { toSocket } = require('../models/user.model');

const { TOKEN_SECRET_KEY } = require('../config/api.config');

module.exports = (socket, unless) => {
  return async ([event, ...args], next) => {
    if (unless.includes(event)) return next();

    const { token } = socket.handshake.auth;

    if (!token) return next(new Error('Authentication error, Please provide a login and password'));

    try {
      const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
    } catch (error) {
      return next(new Error('Authentication error, Please provide a login and password+++'));
    }

    if (!socket.user)
      return next(new Error('Authentication error, Please provide a login and password'));
    const user = await User.findById(socket.user.id);
    if (!user)
      return next(
        new Error('Invalid login or password, kindly contact the admin if this is an anomaly')
      );
    if (!user.isActive) return next(new Error('Authentication error, account is inactive'));
    socket.user = toSocket(user);
    return next();
  };
};
