const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { Server } = require('socket.io');

const connectToMongo = require('./utils/database');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '..', '.env.prod') });
} else {
  dotenv.config({ path: path.join(__dirname, '..', '.env.dev') });
}

const ENV_CONF = require('./config/api.config');

const { PORT, HOST, MONGO_URL, FILE_STORAGE_PATH, BCRYPT_SALT, SESSION_SECRET_KEY } = ENV_CONF;

connectToMongo(MONGO_URL);

const app = express();

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  })
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '..', 'dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.use('/docs', express.static(path.join(__dirname, '..', 'dist', 'docs')));
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'docs', 'index.html'));
});

if (FILE_STORAGE_PATH) {
  app.use('/cloud', express.static(path.normalize(FILE_STORAGE_PATH)));
}

app.use((req, res, next) => {
  res.status(404).json({ message: 'Oops! Error 404 has occurred' });
});

app.use((err, req, res) => {
  res.status(500).json({ message: 'Oops! Internal server error' });
});

const server = http.createServer(app);

const io = new Server(server, {
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
  allowEIO3: true,
  cors: {
    origin: '*',
    credentials: true
  },
  path: '/api'
});

const authMiddleware = require('./middleware/auth');
const scopeMiddleware = require('./middleware/scope');
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');
const timeoutMiddleware = require('./middleware/timeout');

const authHandler = require('./handlers/auth.handler');
const userHandler = require('./handlers/user.handler');
const toolHandler = require('./handlers/tool.handler');
const locationHandler = require('./handlers/location.handler');
const positionHandler = require('./handlers/position.handler');
const unitHandler = require('./handlers/unit.handler');
const companyHandler = require('./handlers/company.handler');
const branchHandler = require('./handlers/branch.handler');
const enterpriseHandler = require('./handlers/enterprise.handler');
const departmentHandler = require('./handlers/department.handler');
const channelHandler = require('./handlers/channel.handler');
const vpnHandler = require('./handlers/vpn.handler');
const ipaddressHandler = require('./handlers/ipaddress.handler');
const ticketHandler = require('./handlers/ticket.handler');
const inspectorHandler = require('./handlers/inspector.handler');
const notificationHandler = require('./handlers/notification.handler');
const eventHandler = require('./handlers/event.handler');
const statisticHandler = require('./handlers/statistic.handler');
const loggerHandler = require('./handlers/logger.handler');
const cloudHandler = require('./handlers/cloud.handler');

const { socketUsers } = require('./utils/socket');

io.on('connection', async (socket) => {
  // socket.use(authMiddleware(socket, ['auth:signin', 'auth:signup']));

  // return all Socket instances of the main namespace
  // const sockets = await io.fetchSockets();

  // socket.use(
  //   scopeMiddleware(socket, [
  //     'auth:signin',
  //     'cloud:find:all',
  //     'notification:find:all',
  //     'notification:remove:one'
  //   ])
  // );

  // socket.use(loggerMiddleware(socket, ['logger:find:all', 'logger:remove:all']));

  // socket.use(timeoutMiddleware(socket, ['auth:signin']));

  authHandler(io, socket);
  userHandler(socket);
  toolHandler(socket);
  locationHandler(socket);
  positionHandler(socket);
  unitHandler(socket);
  companyHandler(socket);
  branchHandler(socket);
  enterpriseHandler(socket);
  departmentHandler(socket);
  channelHandler(socket);
  vpnHandler(socket);
  ipaddressHandler(socket);
  ticketHandler(socket);
  inspectorHandler(socket);
  notificationHandler(socket);
  eventHandler(socket);
  statisticHandler(socket);
  loggerHandler(socket);
  cloudHandler(socket);

  socket.on('message', (payload, callback) => {
    if (typeof payload === 'string') {
      socket.broadcast.emit('message', payload);
      callback({ response: 'Message forwarded' });
    }
  });

  socket.on('error', errorMiddleware(socket));

  socket.on('disconnect', () => {
    if (socket.user) io.emit('message', { response: `${socket.user.name} is logged out` });
    const users = socketUsers(io.sockets.sockets);
    io.emit('users', { response: users });
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
