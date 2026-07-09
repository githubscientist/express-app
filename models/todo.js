const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    isDone: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema, 'todos');