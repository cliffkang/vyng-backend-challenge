const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./api/routes');
const server = express();

server.use(express.json());
server.use(morgan('combined'));
server.use(helmet());
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"]
}));

routes(server);

module.exports = server;