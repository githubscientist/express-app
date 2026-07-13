const dotenv = require('dotenv');

// this will allow us to use the variables
// in .env file here in this server.js
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const BCRYPT_SALT = process.env.BCRYPT_SALT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ENVIRONMENT = process.env.ENVIRONMENT;

module.exports = {
    MONGODB_URI,
    HOST,
    PORT,
    BCRYPT_SALT,
    JWT_SECRET_KEY,
    ENVIRONMENT
}