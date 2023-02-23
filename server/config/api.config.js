const PORT = 3000;
const HOST = 'localhost';
const MONGO_URL = 'mongodb://localhost:27017/helpdesk';
const BCRYPT_SALT = 10;
const SOCKET_TIMEOUT = 60;
const ACCESS_TOKEN_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '24h';
const JWT_SECRET_KEY = 'HELPDESK_JWT_SECRET_KEY';

module.exports = {
    PORT: process.env.PORT || PORT,
    HOST: process.env.HOST || HOST,
    MONGO_URL: process.env.MONGO_URL || MONGO_URL,
    SOCKET_TIMEOUT: process.env.SOCKET_TIMEOUT || SOCKET_TIMEOUT,
    BCRYPT_SALT: Number(process.env.BCRYPT_SALT) || BCRYPT_SALT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || JWT_SECRET_KEY,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || REFRESH_TOKEN_EXPIRES_IN
};
