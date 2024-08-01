const express = require('express');
const app = express();
const cors = require('cors')
const favicon = require('express-favicon');
const logger = require('morgan');
require('dotenv').config();
require('express-async-errors');

// authentication
const authenticateUser = require('./middleware/authentication.js');

// routes
const authRouter = require('./routes/authentication.js');
const mainRouter = require('./routes/mainRouter.js');
const vendorRouter = require('./routes/vendorRouter.js');
const serviceRouter = require('./routes/serviceRouter.js');
const clientRouter = require('./routes/clientRouter.js');
const appointmentRouter = require('./routes/appointmentRouter.js');
const contactRouter = require('./routes/contactRouter.js');
const addressRouter = require('./routes/addressRouter.js');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', authenticateUser, mainRouter);
app.use('/api/v1/vendors', vendorRouter);
app.use('/api/v1/services', authenticateUser, serviceRouter);
app.use('/api/v1/clients', authenticateUser, clientRouter);
app.use('/api/v1/appointments', authenticateUser, appointmentRouter);
app.use('/api/v1/contacts', authenticateUser, contactRouter);
app.use('/api/v1/addresses', authenticateUser, addressRouter);


module.exports = app;
