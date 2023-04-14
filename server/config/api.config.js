const PORT = 3000;
const HOST = 'localhost';
const MONGO_URL = 'mongodb://localhost:27017/helpdesk';
const BCRYPT_SALT = 10;
const SOCKET_TIMEOUT = 60;
const SESSION_EXPIRES_IN = '1h';
const SESSION_SECRET_KEY = 'HELPDESK_SESSION_SECRET_KEY';

module.exports = {
  PORT: process.env.PORT || PORT,
  HOST: process.env.HOST || HOST,
  MONGO_URL: process.env.MONGO_URL || MONGO_URL,
  SOCKET_TIMEOUT: process.env.SOCKET_TIMEOUT || SOCKET_TIMEOUT,
  BCRYPT_SALT: Number(process.env.BCRYPT_SALT) || BCRYPT_SALT,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || SESSION_SECRET_KEY,
  SESSION_EXPIRES_IN: process.env.SESSION_EXPIRES_IN || SESSION_EXPIRES_IN
};
