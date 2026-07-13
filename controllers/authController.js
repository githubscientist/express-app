const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (request, response) => {
        try {
            // get the details from the request body
            const { name, email, password } = request.body;

            // get the user from the database
            const existingUser = await User.findOne({ email });

            // check if the user already exists in the system
            if (existingUser) {
                // the user already registered with that email
                // send an error response
                return response.status(500).json({ message: "Registration failed. User already exists" });
            }

            // encrypt the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user object from the user model
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            // save the user to the database
            let savedUser = await newUser.save();

            // convert the mongoose object to json object
            savedUser = savedUser.toObject();

            delete savedUser.password;
            delete savedUser.__v;

            response.status(200).json({ message: 'User registration is successful!', data: savedUser });
        } catch (e) {
            response.status(500).json({ message: 'Error registering user', error: e.message });
        }
    },
    login: async (request, response) => {
        try {
            // get the credentials from the request body
            const { email, password } = request.body;

            // check if such user exists in the system
            const existingUser = await User.findOne({ email });

            // existingUser is either null or object with user details
            if (!existingUser) {
                // send an error response stating that no such user
                // is there in the system already
                // which means the user have not registered before
                // which means we need to send the user first to registration
                response.status(500).json({ message: 'No such user exists. Please register first!' });
            }

            // it means the user exists with the email id provided
            // compare the passwords -> the password from the frontend, the password in the database
            // for that user email
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (!passwordMatch) {
                // send an error response that the password is incorrect
                response.status(500).json({ message: 'Password does not match! Try again.' });
            }

            // on successful login
            // generate a token
            const token = await jwt.sign({
                userId: existingUser._id
            }, 'apple');

            response.status(200).json({ message: 'User login is successful!', token });
        } catch (e) {
            response.status(500).json({ message: 'Error logging in user', error: e.message });
        }
    },
    me: async (request, response) => {
        try {
            // get the token from the authorization header
            const token = request.headers.authorization?.split(' ')[1];

            if (!token) {
                // send an error response if no token is provided
                response.status(500).json({ message: 'No token is provided' });   
            }

            // verify the token
            const decodedToken = await jwt.verify(token, 'apple');

            // check if the token is a valid token
            if (!decodedToken) {
                response.status(500).json({ message: 'Token is invalid' });
            }

            // extract the userId from the decodedToken or verified token
            const userId = decodedToken.userId;

            // use the userId to fetch the details of the currently logged in user profile from the db
            const user = await User.findById(userId);

            response.status(200).json({ message: 'User profile fetched!', data: user });
        } catch (e) {
            response.status(500).json({ message: 'Error fetching user profile', error: e.message });
        }
    }
}

module.exports = authController;