/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  
  var persons = [
  {
    "ID":1,
    "User_PIN":1,
    "Privilege":14,
    "Name":"Joe",
    "Password":12345,
    "Face_Group_ID":0,
    "Acc_Group_ID":1,
    "Dept_ID":0,
    "Is_Group_TZ":1,
    "Verify_Type":-1,
    "Main_Card":11043482,
    "Vice_Card":"",
    "CREATE_ID":"",
    "MODIFY_TIME":"",
    "SEND_FLAG":0,
    "Expires":0,
    "StartDatetime":0,
    "EndDatetime":0,
    "VaildCount":0,
    "Timezone1":1,
    "Timezone2":0,
    "Timezone3":0
  },
  {
    "ID":2,
    "User_PIN":2,
    "Privilege":14,
    "Name":"Nino",
    "Password":12345,
    "Face_Group_ID":0,
    "Acc_Group_ID":1,
    "Dept_ID":0,
    "Is_Group_TZ":1,
    "Verify_Type":-1,
    "Main_Card":null,
    "Vice_Card":"",
    "CREATE_ID":"",
    "MODIFY_TIME":"",
    "SEND_FLAG":0,
    "Expires":0,
    "StartDatetime":0,
    "EndDatetime":0,
    "VaildCount":0,
    "Timezone1":1,
    "Timezone2":0,
    "Timezone3":0
  },
  {
    "ID":3,
    "User_PIN":3,
    "Privilege":0,
    "Name":"Alejandro Sena",
    "Password":null,
    "Face_Group_ID":0,
    "Acc_Group_ID":1,
    "Dept_ID":0,
    "Is_Group_TZ":1,
    "Verify_Type":-1,
    "Main_Card":null,
    "Vice_Card":"",
    "CREATE_ID":"",
    "MODIFY_TIME":"",
    "SEND_FLAG":0,
    "Expires":0,
    "StartDatetime":0,
    "EndDatetime":0,
    "VaildCount":0,
    "Timezone1":1,
    "Timezone2":0,
    "Timezone3":0
  },
  {
    "ID":4,
    "User_PIN":4,
    "Privilege":0,
    "Name":"Alejandro Sena",
    "Password":null,
    "Face_Group_ID":0,
    "Acc_Group_ID":1,
    "Dept_ID":0,
    "Is_Group_TZ":1,
    "Verify_Type":-1,
    "Main_Card":null,
    "Vice_Card":"",
    "CREATE_ID":"",
    "MODIFY_TIME":"",
    "SEND_FLAG":0,
    "Expires":0,
    "StartDatetime":0,
    "EndDatetime":0,
    "VaildCount":0,
    "Timezone1":1,
    "Timezone2":0,
    "Timezone3":0
  }];

  var person;

  persons.forEach(function(item) { if (req.body.user_id == item['ID']) { person = item; } })

  res.json(person);

  req.app.get('io').sockets.emit('newArrival', person)
};
