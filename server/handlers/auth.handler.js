const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const { toResponse, toToken, toSocket } = require('../models/user.model');

const { socketUsers } = require('../utils/socket');

const { BCRYPT_SALT, TOKEN_SECRET_KEY, TOKEN_EXPIRES_IN } = require('../config/api.config');

module.exports = (io, socket) => {
  const signin = async ({ login, password }, callback) => {
    try {
      const user = await User.findOne({ login });
      if (!user) throw new Error('User is not found');
      if (!user?.isActive) throw new Error('Account is disabled');
      const isPassword = await bcrypt.compare(password, user?.password);
      if (!isPassword) throw new Error('The password is incorrect');
      const accessToken = jwt.sign(toToken(user), TOKEN_SECRET_KEY, {
        expiresIn: TOKEN_EXPIRES_IN
      });
      socket.user = toSocket(user);
      socket.handshake.auth.token = accessToken;
      socket.broadcast.emit('message', { response: `${user.name} is logged in` });
      socket.emit('message', { response: `${user.name} welcome` });
      const users = socketUsers(io.sockets.sockets);
      io.emit('users', { response: users });
      callback({ response: accessToken });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const signup = async ({ login, password, name, email, phone }, callback) => {
    try {
      const isUser = await User.findOne({ login });
      if (isUser) throw new Error('User login already taken');
      const countUsers = await User.countDocuments();
      const passwordHash = await bcrypt.hash(password, BCRYPT_SALT);
      const user = await User.create({
        login,
        password: passwordHash,
        name,
        email,
        phone,
        isActive: countUsers === 0 ? true : false,
        isAdmin: countUsers === 0 ? true : false
      });
      callback({ response: toResponse(user) });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const refresh = async (payload, callback) => {
    try {
      const { token } = socket.handshake.auth;
      try {
        const decodedToken = jwt.verify(token, TOKEN_SECRET_KEY);
        const { id } = decodedToken;
        const user = await User.findById(id);
        if (!user) throw new Error('User is not found');
        if (!user?.isActive) throw new Error('Account is disabled');
        const accessToken = jwt.sign(toToken(user), TOKEN_SECRET_KEY, {
          expiresIn: TOKEN_EXPIRES_IN
        });
        socket.user = toSocket(user);
        socket.handshake.auth.token = accessToken;
        socket.broadcast.emit('message', { response: `${user.name} is logged in` });
        socket.emit('message', { response: `${user.name} welcome` });
        const users = socketUsers(io.sockets.sockets);
        io.emit('users', { response: users });
        callback({ response: accessToken });
      } catch (err) {
        throw new Error('Authentication error, Please provide a login and password------');
      }
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const me = async (payload, callback) => {
    try {
      const user = await User.findById(socket.user.id);
      callback({ response: toResponse(user) });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('auth:signin', signin);
  socket.on('auth:signup', signup);
  socket.on('auth:refresh', refresh);
  socket.on('auth:me', me);
};
