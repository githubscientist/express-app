const app = require("./app");
const mongoose = require('mongoose');
const { MONGODB_URI, PORT, HOST } = require("./utils/config");

// connect to the mongodb database
mongoose    
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB database...');

        // start the server to listen for requests
        app
            .listen(PORT, HOST, () => {
                console.log(`Server is running at http://${HOST}:${PORT}...`);
            });
    })
    .catch((error) => {
        console.log('Error in connecting to the database');
        console.log(`Error:`, error.message);
    })