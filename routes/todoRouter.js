// import express
const express = require('express');
const { getAllTodos, createTodo, updateTodo, deleteTodo, getTodoById } = require('../controllers/todoController');
const { isAuthenticated } = require('../middlewares/auth');

// create router
const todoRouter = express.Router();

// define routes
todoRouter.get("/", isAuthenticated, getAllTodos);
todoRouter.get("/:id", isAuthenticated, getTodoById);
todoRouter.post("/", isAuthenticated, createTodo);
todoRouter.put("/:id", isAuthenticated, updateTodo);
todoRouter.delete("/:id", isAuthenticated, deleteTodo);

// export router
module.exports = todoRouter;