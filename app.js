// import express
const express = require('express');
const todoRouter = require('./routes/todoRouter');

// create express app
const app = express();

// use a middleware to parse the request body
app.use(express.json());

app.use("/todos", todoRouter);

module.exports = app;