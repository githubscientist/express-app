// 1. import express
const express = require('express');

// 2. create express app
const app = express();

// 4. define the routes
app.get("/todos", (request, response) => {
    response.send('GET all todos');
});

app.post("/todos", (request, response) => {
    response.send('POST todo');
});

app.put("/todos", (request, response) => {
    response.send('PUT todo');
});

app.delete("/todos", (request, response) => {
    response.send('DELETE todo');
});

// 3. start the server to listen for requests
app
    .listen(3001, 'localhost', () => {
        console.log(`server is running at http://localhost:3001`);
    });