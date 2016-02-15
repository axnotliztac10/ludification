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

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('___------______------_____ NEW CONNECTION!');
});

app.set('io', io);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to Mongo');
});

var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  ID: Number,
  User_PIN: Number,
  Privilege: Number,
  Name: String,
  Password: Number,
  Face_Group_ID: Number,
  Acc_Group_ID: Number,
  Dept_ID: Number,
  Is_Group_TZ: Number,
  Verify_Type: Number,
  Main_Card: Number,
  Vice_Card: String,
  CREATE_ID: String,
  MODIFY_TIME: String,
  SEND_FLAG: Number,
  Expires: Number,
  StartDatetime: Number,
  EndDatetime: Number,
  VaildCount: Number,
  Timezone1: Number,
  Timezone2: Number,
  Timezone3: Number
});

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
