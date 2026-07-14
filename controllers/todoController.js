// import the model Todo
const Todo = require('../models/todo');
const User = require('../models/user');

const todoController = {
    getAllTodos: async (request, response) => {
        try {
            // get the userId from the request object
            const userId = request.userId;

            // find all todos for the user
            const todos = await User.findById(userId).populate('todos').select('todos -_id');

            response.status(200).json(todos.todos);
        } catch (e) {
            return response.status(500).json({ message: 'Error fetching all todos...', error: e.message });
        }
    },
    getTodoById: async (request, response) => {
        try {
            const { id } = request.params;

            // check if the todo belongs to the user
            const userId = request.userId;

            const user = await User.findById(userId);
            const todoExists = user.todos.includes(id);

            if (!todoExists) {
                return response.status(403).json({ message: 'You are not authorized to read this todo' });
            }

            const todo = await Todo.findById(id);

            response.status(200).json(todo);
        } catch (e) {
            return response.status(500).json({ message: 'Error fetching all todos...', error: e.message });
        }
    },
    createTodo: async (request, response) => {
        try {
            // get the data from the frontend
            const { title, description, isDone } = request.body;

            // create a object to the model
            const newTodo = new Todo({
                title,
                description,
                isDone
            });

            // save the data to the database
            const savedTodo = await newTodo.save();

            // get the userId from the request object
            const userId = request.userId;

            // push the todo id to the user model
            const user = await User.findById(userId);
            user.todos.push(savedTodo._id);
            await user.save();

            // add the user id to the todo model
            savedTodo.user = userId;
            await savedTodo.save();

            // send a response to the frontend
            response.status(200).json({ message: 'New todo created successfully', data: savedTodo });
        } catch (e) {
            return response.status(500).json({ message: 'Error creaing new todo...', error: e.message });
        }
    },
    updateTodo: async (request, response) => {
        try {
            const { id } = request.params;

            // check if the todo belongs to the user
            const userId = request.userId;

            const user = await User.findById(userId);
            const todoExists = user.todos.includes(id);

            if (!todoExists) {
                return response.status(403).json({ message: 'You are not authorized to update this todo' });
            }

            const { title, description, isDone } = request.body;

            const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, isDone }, { returnDocument: "after", runValidators: true });

            response.status(200).json({ message: 'Todo updated', data: updatedTodo });
        } catch (e) {
            return response.status(500).json({ message: 'Error updating todo...', error: e.message });
        }
    },
    deleteTodo: async (request, response) => {
        try {
            // get the id from the request params
            const { id } = request.params;

            // check if the todo belongs to the user
            const userId = request.userId;

            const user = await User.findById(userId);
            const todoExists = user.todos.includes(id);

            if (!todoExists) {
                return response.status(403).json({ message: 'You are not authorized to delete this todo' });
            }

            // perform deletion from todos collection
            const deletedTodo = await Todo.findByIdAndDelete(id);

            // delete the todo id from the user model
            user.todos.pull(id);
            await user.save();

            if (!deletedTodo) {
                // this means, deletedTodo is null
                // the id either does not exist or the object does not exist
                // send an error response in these cases
                return response.status(500).json({ message: 'Todo not found...' });
            }

            response.status(200).json({ message: 'Deleted todo successfully' });
        } catch (e) {
            return response.status(500).json({ message: 'Error deleting todo...', error: e.message });
        }
    }
}

module.exports = todoController;