// import express
const express = require('express');
const todoRouter = require('./routes/todoRouter');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');
const errorRouter = require('./utils/errorRoute');

// create express app
const app = express();

// use a middleware to parse the request body
// app.use(express.json());
app.use(bodyParser.json());

// middleware to log all the incoming requests
// app.use(morgan("dev"));
app.use(logger);

app.use("/todos", todoRouter);

// middleware to send response handling error routes
app.use(errorRouter);

module.exports = app;