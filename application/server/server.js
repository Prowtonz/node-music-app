const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const port = 80;

// allow body parsing for json
app.use(bodyParser.json());

// allow cross-origin requests
app.use(cors());

// use express built-in middleware function to serve static files
// this will serve all the content of the client folder by using absolute path
app.use(express.static(path.join(__dirname, '..', '/client')));

// require in the routes created via express router
const apiRoutes = require('./api/routes.js');

// first argument is a string to prefix to the URL
// second argument are the routes for our express server to use and apply this prefix to
app.use('/api', apiRoutes);

// start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});