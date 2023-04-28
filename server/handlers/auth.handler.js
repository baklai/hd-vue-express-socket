const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const { toResponse, toToken, toSocket } = require('../models/user.model');

const { socketUsers } = require('../utils/socket');

const { TOKEN_SECRET_KEY, TOKEN_EXPIRES_IN } = require('../config/api.config');

module.exports = (socket) => {
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

      socket.broadcast.emit('message', { response: `${user.name} is logged in` });

      socket.emit('message', { response: `${user.name} welcome` });

      // const users = socketUsers(io.sockets.sockets);

      // io.emit('helpdesk:users', users);
      callback({ response: accessToken });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const signup = async (payload, callback) => {
    try {
      const { login, password } = payload;
      const user = await User.findOne({ login });
      if (!user) return callback({ error: 'User is not found' });
      if (!user.isActive) return callback({ error: 'Account is disabled' });
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) return callback({ error: 'The password is incorrect' });
      socket.user = toSocket(user);
      socket.broadcast.emit('message', `${user.name} is logged in`);
      socket.emit('message', `${user.name} welcome`);
      const users = socketUsers(io.sockets.sockets);
      io.emit('helpdesk:users', users);

      callback({ response: toResponse(user) });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const refresh = async (payload, callback) => {
    try {
      const { login, password } = payload;
      const user = await User.findOne({ login });
      if (!user) return callback({ error: 'User is not found' });
      if (!user.isActive) return callback({ error: 'Account is disabled' });
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) return callback({ error: 'The password is incorrect' });
      socket.user = toSocket(user);
      socket.broadcast.emit('message', `${user.name} is logged in`);
      socket.emit('message', `${user.name} welcome`);
      const users = socketUsers(io.sockets.sockets);
      io.emit('helpdesk:users', users);

      callback({ response: toResponse(user) });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  const me = async (payload, callback) => {
    try {
      callback({ response: socket.user });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('auth:signin', signin);
  socket.on('auth:signup', signup);
  socket.on('auth:refresh', refresh);
  socket.on('auth:me', me);
};

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const User = require('../models/user.model');
// const { toResponse, toToken } = require('../models/user.model');
// const RefreshToken = require('../models/refreshToken.model');

// const {
//   JWT_SECRET_KEY,
//   ACCESS_TOKEN_EXPIRES_IN,
//   REFRESH_TOKEN_EXPIRES_IN
// } = require('../config/api.config');

// const signin = async (req, res, next) => {
//   try {
//     const { login, password } = req.body;
//     const user = await User.findOne({ login });

//     req.session.user = user;

//     // const accessToken = jwt.sign(toToken(user), JWT_SECRET_KEY, {
//     //   expiresIn: ACCESS_TOKEN_EXPIRES_IN
//     // });
//     // const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
//     //   expiresIn: REFRESH_TOKEN_EXPIRES_IN
//     // });
//     // const userRefreshToken = await RefreshToken.findOne({ user: user._id });
//     // if (userRefreshToken) await userRefreshToken.deleteOne();
//     // await RefreshToken.create({ user: user.id, token: refreshToken });
//     // res.setHeader('Access-Control-Expose-Headers', 'Authorization');
//     // res.setHeader('Authorization', `Bearer ${accessToken}`);
//     // res.status(200).json({ accessToken, refreshToken });

//     console.log(req.session);

//     res.status(200).json({ ...user });
//   } catch (err) {
//     next(err);
//   }
// };

// const signup = async (req, res, next) => {
//   try {
//     res.status(200).json({});
//   } catch (err) {
//     next(err);
//   }
// };

// const signout = async (req, res, next) => {
//   try {
//     // await RefreshToken.deleteOne({ user: req.user.id });
//     res.status(200).json({ message: 'Ok' });
//   } catch (err) {
//     next(err);
//   }
// };

// const refresh = async (req, res, next) => {
//   try {
//     //  const { refreshToken } = req.body;
//     //  if (refreshToken === null) return res.status(403).json({ message: 'Refresh token is required' });
//     //  const userRefreshToken = await RefreshToken.findOne({ token: refreshToken });
//     //  if (!userRefreshToken) return res.status(403).json({ message: 'Refresh token is not in database' });
//     //  const valid = jwt.verify(refreshToken, JWT_SECRET_KEY);
//     //   if (!valid) return res.status(403).json({ message: 'Refresh token was expired. Please make a new signin request' });
//     //  const user = await User.findById(userRefreshToken.user);
//     // const accessToken = jwt.sign(toToken(user), JWT_SECRET_KEY, {
//     //   expiresIn: ACCESS_TOKEN_EXPIRES_IN
//     // });
//     const accessToken = jwt.sign({ dd: 'dfg' }, JWT_SECRET_KEY, {
//       expiresIn: ACCESS_TOKEN_EXPIRES_IN
//     });
//     res.setHeader('Access-Control-Expose-Headers', 'Authorization');
//     res.setHeader('Authorization', `Bearer ${accessToken}`);
//     res.status(200).json({ accessToken });
//   } catch (err) {
//     next(err);
//   }
// };

// const me = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.auth.id);
//     res.status(200).json(toResponse(user));
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = { signin, signup, signout, refresh, me };
