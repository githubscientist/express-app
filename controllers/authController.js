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
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);

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
            }, JWT_SECRET_KEY);

            // directly save the token to the frontend
            // httpOnly cookies
            response.cookie('token', token, {
                httpOnly: true,
                secure: ENVIRONMENT === 'production', // set to true in production
                sameSite: 'strict', // adjust based on your needs
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            response.status(200).json({ message: 'User login is successful!'});
        } catch (e) {
            response.status(500).json({ message: 'Error logging in user', error: e.message });
        }
    },
    me: async (request, response) => {
        try {
            // extract the userId from the request object
            const userId = request.userId;

            // use the userId to fetch the details of the currently logged in user profile from the db
            const user = await User.findById(userId);

            response.status(200).json({ message: 'User profile fetched!', data: user });
        } catch (e) {
            response.status(500).json({ message: 'Error fetching user profile', error: e.message });
        }
    },
    logout: async (request, response) => {
        try {
            // clear the token cookie
            response.clearCookie('token', {
                httpOnly: true,
                secure: 'development' === 'production', // set to true in production
                sameSite: 'strict' // adjust based on your needs
            });

            response.status(200).json({ message: 'User logged out successfully!' });
        } catch (e) {
            response.status(500).json({ message: 'Error logging out the user', error: e.message });
        }
    }
}

module.exports = authController;