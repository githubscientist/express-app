const todoController = {
    getAllTodos: (request, response) => {
        response.status(200).json({ message: 'GET all todos' });
    },
    createTodo: (request, response) => {
        response.status(200).json({ message: 'Create a new todo' });
    },
    updateTodo: (request, response) => {
        response.status(200).json({ message: 'Update todo' });
    },
    deleteTodo: (request, response) => {
        response.status(200).json({ message: 'Delete todo' });
    }
}

module.exports = todoController;