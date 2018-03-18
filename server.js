const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');

// create express app
var app = express();

//morgan to log in the "combined" pre-defined format
app.use(logger('dev'))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Import Routes
require('./routes/route')(app);

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: "pushpa",
        email: "pushpa@gmail.com"
    }
    jwt.sign({user: user}, 'wadawada',{ expiresIn: '30s' }, (err, token) => {
        res.json({
            token: token
        });
    });
});

function verifyToken(req, res, next) {
    
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(401);
    }
}

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'wadawada', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.status(200).send({
                "message": "Welcome to NodeJS API Services",
                authData
            });
        }
    });
});

app.get('*', verifyToken, (req, res) => res.status(200).send({
    "message": "Welcome to NodeJS API Services"
}));

// listen for requests
app.listen(3000, function () {
    console.log("Server is listening on port 3000");
});

// var q = 'TestQueue';

// var open = require('amqplib').connect('amqp://localhost');

// // Publisher
// open.then(function (conn) {
//     return conn.createChannel();
// }).then(function (ch) {
//     return ch.assertQueue(q).then(function (ok) {
//         return ch.sendToQueue(q, new Buffer(JSON.stringify({ id: "102", name: "Donkey", age: 20 })));
//     });
// }).catch(console.warn);

// // Consumer npm install amqplib -g
// open.then(function (conn) {
//     return conn.createChannel();
// }).then(function (ch) {
//     return ch.assertQueue(q).then(function (ok) {
//         return ch.consume(q, function (msg) {
//             if (msg !== null) {
//                 console.log("LOG------" + msg.content.toString());
//                 ch.ack(msg);
//             }
//         });
//     });
// }).catch(console.warn);

module.exports = app;