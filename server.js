const app = require("./app");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// this will allow us to use the variables
// in .env file here in this server.js
dotenv.config();

// connect to the mongodb database
mongoose    
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB database...');

        // start the server to listen for requests
        app
            .listen(3001, 'localhost', () => {
                console.log(`Server is running at http://localhost:3001...`);
            });
    })
    .catch((error) => {
        console.log('Error in connecting to the database');
        console.log(`Error:`, error.message);
    })