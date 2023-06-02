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

const ENV_CONF = require('./config');

const { PORT, HOST, MONGO_URL, FILE_STORAGE_PATH } = ENV_CONF;

connectToMongo(MONGO_URL);

const agentRoutes = require('./routes');

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
  app.use('/filehosting', express.static(path.normalize(FILE_STORAGE_PATH)));
}

app.use('/agent', agentRoutes);

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
  path: '/helpdesk'
});

const authMiddleware = require('./middleware/auth');
const scopeMiddleware = require('./middleware/scope');
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const authHandler = require('./handlers/auth.handler');
const userHandler = require('./handlers/user.handler');
const chatHandler = require('./handlers/chat.handler');
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
const requestHandler = require('./handlers/request.handler');
const inspectorHandler = require('./handlers/inspector.handler');
const notificationHandler = require('./handlers/notification.handler');
const eventHandler = require('./handlers/event.handler');
const statisticHandler = require('./handlers/statistic.handler');
const loggerHandler = require('./handlers/logger.handler');
const filehostingHandler = require('./handlers/filehosting.handler');
const unsoftwareHandler = require('./handlers/unsoftware.handler');
const exaccountHandler = require('./handlers/exaccount.handler');

const { socketUsers } = require('./utils/socket');

io.on('connection', async (socket) => {
  socket.use(authMiddleware(socket, ['auth:signin', 'auth:signup', 'auth:refresh', 'auth:me']));

  socket.use(
    scopeMiddleware(socket, [
      'auth:me',
      'auth:signin',
      'auth:signup',
      'auth:refresh',
      'chat:message'
    ])
  );

  socket.use(loggerMiddleware(socket, ['chat:message']));

  authHandler(io, socket);
  userHandler(socket);
  chatHandler(socket);
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
  requestHandler(socket);
  inspectorHandler(socket);
  notificationHandler(socket);
  eventHandler(socket);
  statisticHandler(socket);
  loggerHandler(socket);
  filehostingHandler(socket);
  unsoftwareHandler(socket);
  exaccountHandler(socket);

  socket.on('error', errorMiddleware(socket));

  socket.on('message', (payload, callback) => {
    if (typeof payload === 'string') {
      socket.broadcast.emit('message', payload);
      callback({ response: 'Message forwarded to all users' });
    }
  });

  socket.on('disconnect', () => {
    if (socket.user) io.emit('message', { response: `${socket.user.fullname} is logged out` });
    const users = socketUsers(io.sockets.sockets);
    io.emit('onusers', { response: users });
  });
});

server.listen(PORT, () => {
  console.info(`Server listening on http://${HOST}:${PORT}`);
});
