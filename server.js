/* Empty JS object to act as endpoint for all routes */
let projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */   
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
    /* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);

function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/', sendData);

function sendData(req, res) {
    res.json(projectData);
};

// POST route
app.post('/', postData);

function postData(req, res) {
    projectData = {...req.body};
    res.json(req.body);
    console.log(projectData);
};