const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { expressjwt: jwt } = require('express-jwt');

const connectToMongo = require('./utils/database');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, '..', '.env.prod') });
} else {
    dotenv.config({ path: path.join(__dirname, '..', '.env.dev') });
}

const ENV_CONF = require('./config/api.config');

const { PORT, HOST, MONGO_URL, BCRYPT_SALT, JWT_SECRET_KEY } = ENV_CONF;

connectToMongo(MONGO_URL, BCRYPT_SALT);

const authRoutes = require('./routes/auth.router');
const userRoutes = require('./routes/user.router');
const toolRoutes = require('./routes/tool.router');
const locationRoutes = require('./routes/location.router');
const positionRoutes = require('./routes/position.router');
const unitRoutes = require('./routes/unit.router');
const companyRoutes = require('./routes/company.router');
const branchRoutes = require('./routes/branch.router');
const enterpriseRoutes = require('./routes/enterprise.router');
const departmentRoutes = require('./routes/department.router');
const channelRoutes = require('./routes/channel.router');
const vpnRoutes = require('./routes/vpn.router');
const ipaddressRoutes = require('./routes/ipaddress.router');
const requestRoutes = require('./routes/request.router');
const inspectorRoutes = require('./routes/inspector.router');
const notificationRoutes = require('./routes/notification.router');
const eventRoutes = require('./routes/event.router');
const statisticRoutes = require('./routes/statistic.router');
const loggerRoutes = require('./routes/logger.router');

const logger = require('./middleware/logger');
const apiError = require('./middleware/error');

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

app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', '200.html'));
});

app.use(
    logger({ connectionString: MONGO_URL }).unless({
        path: [{ url: '/api/v1/logger', methods: ['GET', 'POST'] }]
    })
);

// app.use(
//     jwt({
//         secret: JWT_SECRET_KEY,
//         algorithms: ['sha1', 'RS256', 'HS256']
//     }).unless({
//         path: [
//             { url: '/api/v1/auth/signin', methods: ['POST'] },
//             { url: '/api/v1/auth/refresh', methods: ['POST'] },
//             { url: '/api/v1/inspector', methods: ['POST', 'PUT'] }
//             // { url: new RegExp('/api/v1/tool.*/', 'i'), methods: ['GET'] }
//         ]
//     })
// );

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/tool', toolRoutes);
app.use('/location', locationRoutes);
app.use('/position', positionRoutes);
app.use('/unit', unitRoutes);
app.use('/company', companyRoutes);
app.use('/branch', branchRoutes);
app.use('/enterprise', enterpriseRoutes);
app.use('/department', departmentRoutes);
app.use('/channel', channelRoutes);
app.use('/vpn', vpnRoutes);
app.use('/ipaddress', ipaddressRoutes);
app.use('/request', requestRoutes);
app.use('/inspector', inspectorRoutes);
app.use('/notification', notificationRoutes);
app.use('/event', eventRoutes);
app.use('/statistic', statisticRoutes);
app.use('/logger', loggerRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Oops! Error 404 has occurred' });
});

app.use((err, req, res, next) => {
    apiError(err, res);
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
const timeoutMiddleware = require('./middleware/timeout');

const { socketUsers } = require('./utils/socket');

io.on('connection', async (socket) => {
    // socket.use(authMiddleware(socket, ['auth:signin']));

    // socket.use(scopeMiddleware(socket, ['auth:signin', 'cloud:find:all', 'notification:find:all', 'notification:remove:one']));

    // socket.use(loggerMiddleware(socket, ['logger:find:all', 'logger:remove:all']));

    // socket.use(timeoutMiddleware(socket, ['auth:signin']));

    // authHandler(io, socket);
    // userHandler(io, socket);
    // toolHandler(io, socket);
    // locationHandler(io, socket);
    // positionHandler(io, socket);
    // unitHandler(io, socket);
    // companyHandler(io, socket);
    // branchHandler(io, socket);
    // enterpriseHandler(io, socket);
    // departmentHandler(io, socket);
    // channelHandler(io, socket);
    // vpnHandler(io, socket);
    // ipaddressHandler(io, socket);
    // requestHandler(io, socket);
    // inspectorHandler(io, socket);
    // notificationHandler(io, socket);
    // eventHandler(io, socket);
    // statisticHandler(io, socket);
    // loggerHandler(io, socket);
    // cloudHandler(io, socket);

    socket.on('helpdesk:message', (payload, callback) => {
        if (typeof payload === 'string') socket.broadcast.emit('helpdesk:message', payload);
    });

    socket.on('error', errorMiddleware(socket, 'helpdesk:error'));

    socket.on('disconnect', () => {
        if (socket.user) io.emit('helpdesk:message', `${socket.user.name} is logged out`);
        const users = socketUsers(io.sockets.sockets);
        io.emit('helpdesk:users', users);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
});
