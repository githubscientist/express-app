// import express
const express = require('express');
const { getAllTodos, createTodo, updateTodo, deleteTodo, getTodoById } = require('../controllers/todoController');

// create router
const todoRouter = express.Router();

// define routes
todoRouter.get("/", getAllTodos);
todoRouter.get("/:id", getTodoById);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

// export router
module.exports = todoRouter;