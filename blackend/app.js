require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const app = express();
const routers = require('./routers/routes')
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api',routers);

module.exports = app;
