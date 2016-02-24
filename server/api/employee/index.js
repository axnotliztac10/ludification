'use strict';

var express = require('express');
var controller = require('./employee.controller');

var router = express.Router();
router.post('/', controller.index);
router.get('/loadDump', controller.loadDump);

module.exports = router;