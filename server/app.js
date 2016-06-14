/**
 * Main application file
 */

'use strict';


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

var app = express();
var server = require('http').createServer(app);
var fs = require('fs');

require('./config/express')(app);
require('./routes')(app);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ludification');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo');
});

var io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('___------______------_____ NEW CONNECTION!');
});

app.set('io', io);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
