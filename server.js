const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// create express app
var app = express();

//morgan to log in the "combined" pre-defined format
app.use(logger('dev'))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Import Routes
require('./routes/SubjectAreaRoute')(app);

app.get('*', (req, res) => res.status(200).send({
    "message": "Welcome to NodeJS API Services"
}));

// listen for requests
app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});

module.exports = app;