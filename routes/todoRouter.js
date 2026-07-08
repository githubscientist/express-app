// import express
const express = require('express');
const { getAllTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// create router
const todoRouter = express.Router();

// define routes
todoRouter.get("/", getAllTodos);
todoRouter.post("/", createTodo);
todoRouter.put("/", updateTodo);
todoRouter.delete("/", deleteTodo);

// export router
module.exports = todoRouter;