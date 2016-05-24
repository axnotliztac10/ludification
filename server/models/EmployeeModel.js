var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recordSchema = new Schema({
  late: { type: Number, default: 0 },
  tolerancy: { type: Number, default: 0 },
  ontime: { type: Number, default: 0 }
});

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
  Timezone3: Number,
  Area: String,
  Team: String,
  Record: { type: [recordSchema], required: true }
});

var Person = mongoose.model('Employee', new Schema({ any: {} }, {collection: 'Employee'}));

module.exports = Person;
