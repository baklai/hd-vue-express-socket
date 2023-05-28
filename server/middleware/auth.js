const jwt = require('jsonwebtoken');

const { TOKEN_SECRET_KEY } = require('../config/api.config');

module.exports = (socket, unless) => {
  return async ([event, ...args], next) => {
    console.log(event);
    if (unless.includes(event)) return next();
    const { token } = socket.handshake.auth;
    if (!token) return next(new Error('Authentication error, Please provide a login and password'));
    try {
      const decodedToken = jwt.verify(token, TOKEN_SECRET_KEY);
      const { isActive } = decodedToken;
      if (!isActive) return next(new Error('Account is disabled'));
    } catch (error) {
      return next(new Error('Authentication error, Please provide a login and password'));
    }
    return next();
  };
};
