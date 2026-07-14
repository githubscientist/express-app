// import express
const express = require('express');
const todoRouter = require('./routes/todoRouter');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');
const errorRouter = require('./utils/errorRoute');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const adminRouter = require('./routes/adminRouter');

// create express app
const app = express();

// use a middleware to parse the request body
// app.use(express.json());
app.use(bodyParser.json());

// parse the cookies
app.use(cookieParser());

// middleware to log all the incoming requests
// app.use(morgan("dev"));
app.use(logger);

app.use("/auth", authRouter);
app.use("/todos", todoRouter);
app.use("/admin", adminRouter);

// middleware to send response handling error routes
app.use(errorRouter);

module.exports = app;