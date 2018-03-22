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
require('./routes/route')(app);

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