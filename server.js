const app = require("./app");

// 3. start the server to listen for requests
app
    .listen(3001, 'localhost', () => {
        console.log(`server is running at http://localhost:3001`);
    });