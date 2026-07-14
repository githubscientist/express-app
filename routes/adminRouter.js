const express = require('express');
const { getAllTodos } = require('../controllers/adminController');
const { isAuthenticated, allowRoles } = require('../middlewares/auth');

const adminRouter = express.Router();

// admin specific routes
adminRouter.get(
    "/todos",
    isAuthenticated,
    allowRoles(['admin']),
    getAllTodos
);

module.exports = adminRouter;