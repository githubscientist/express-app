const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/config');
const User = require('../models/user');

const auth = {
    isAuthenticated: async (request, response, next) => {
        try {
            // get the token from the authorization header
            const token = request.cookies?.token;

            if (!token) {
                // send an error response if no token is provided
                return response.status(500).json({ message: 'No token is provided or user not logged in!' });   
            }

            // verify the token
            const decodedToken = await jwt.verify(token, JWT_SECRET_KEY);

            // check if the token is a valid token
            if (!decodedToken) {
                return response.status(500).json({ message: 'Token is invalid' });
            }

            // extract the userId from the decodedToken or verified token
            const userId = decodedToken.userId;

            // add the userId to the request object
            // because then all the other routes or functions can use the userId from the
            // request object
            request.userId = userId;

            // call the next middleware
            next();
        } catch (e) {
            return response.status(500).json({ message: 'User not authenticated!' });
        }
    },
    allowRoles: (roles) => {
        return async (request, response, next) => {
            // get the userId from the request object
            const userId = request.userId;

            // get the user from the database
            const user = await User.findById(userId);

            // check if the user exists
            if (!user) {
                return response.status(500).json({ message: 'User not found!' });
            }

            // check if the currently logged in user has the required role
            if (!roles.includes(user.role)) {
                return response.status(500).json({ message: 'User does not have the required role!' });
            }

            // call the next middleware
            next();
        }
    }
}

module.exports = auth;