var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecordSchema = require('./Record.js').schema;
var TeamSchema = require('./Team.js').schema;
var DepartmentSchema = require('./Department.js').schema;

var EmployeeSchema = new Schema({
  EmployeeID: { type: Number, required: true },
  Name: { type: String, required: true },
  Record: { type: [RecordSchema], required: false },
  Team: { type: TeamSchema, required: false },
  Department: { type: DepartmentSchema, required: false }
});

module.exports = mongoose.model('Employee', EmployeeSchema);