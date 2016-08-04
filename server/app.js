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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ludification');

var admin = require('swan-admin');
var Employee = require('./models/Employee.js');
var Department = require('./models/Department.js');
var Team = require('./models/Team.js');

app.use('/admin', admin({
    models: [{
        mongooseModel: Employee,
        toString: 'Name',
        fields: {
            Department: {
            	editor: 'dropdown',
            	service: { name: 'departments', model: Department }
            }
        }
    },{
        mongooseModel: Department,
        toString: 'Name',
        fields: {
            
        }
    },{
        mongooseModel: Team,
        toString: 'Name',
        fields: {
            
        }
    }],
    credentials: {
        username: 'metabaron',
        password: 'Aqwe123!'
    },
    sessionSecret: 'aluisdhaiushdgkaugsdkasd'
}));

require('./config/express')(app);
require('./routes')(app);

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
