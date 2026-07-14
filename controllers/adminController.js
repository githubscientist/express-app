const adminController = {
    getAllTodos: async (request, response) => {
        try {
            return response.status(200).json({ message: 'fetching all todos' });
        } catch (e) {
            return response.status(500).json({ message: 'Fetching all notes failed...', error: e.message });
        }
    },
}

module.exports = adminController;