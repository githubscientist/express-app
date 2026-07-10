# Backend Repo for the App

This repository contains the backend code for the application.

It uses:

- Node.js
- Express.js
- MongoDB

## Steps to setup the backend

1. Setup Git and GitHub.
2. Npm setup.
3. Server setup using Express.js.

## middleware

- middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. 

## Data for Todo

{
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs, Fruits",
    "isDone": false
}

{
    "title": "Complete project",
    "description": "Finish the backend implementation",
    "isDone": true
}

{
    "title": "Read a book",
    "description": "Read 'The Great Gatsby'",
    "isDone": false
}

{
    "title": "Exercise",
    "description": "Go for a 30-minute run",
    "isDone": true
}

{
    "title": "Call mom",
    "description": "Check in and see how she's doing",
    "isDone": false
}

[ ] custom middleware - logging, error handling
[ ] deployment to render.com
[ ] connecting to the React frontend
[ ] authentication & authorization
[ ] connecting express with MySQL
[ ] performing CRUD operations with MySQL
[ ] Query Building and Filtering