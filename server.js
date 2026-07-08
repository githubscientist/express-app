// 1. import express
const express = require('express');

// 2. create express app
const app = express();

// 4. define the routes
app.get("/", (request, response) => {
    response.send('hello world!');
});

// 3. start the server to listen for requests
app
    .listen(3001, 'localhost', () => {
        console.log(`server is running at http://localhost:3001`);
    });