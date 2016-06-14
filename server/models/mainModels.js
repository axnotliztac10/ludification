var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  timeLabel: { type: String, required: true },
  time: { type: Date, required: true },
});

var TeamSchema = new Schema({
  Name: { type: String, required: true },
  Description: { type: String },
  Schedule: { type: Object, required: true }
});

var DepartmentSchema = new Schema({
  Name: { type: String, required: true },
  Description: { type: String },
  Schedule: { type: Object, required: true }
});

var EmployeeSchema = new Schema({
  EmployeeID: { type: Number, required: true },
  Name: { type: String, required: true },
  Record: { type: [RecordSchema], required: false },
  Team: { type: TeamSchema, required: false },
  Department: { type: DepartmentSchema, required: false }
});

module.exports = {
  Employee: mongoose.model('Employee', EmployeeSchema),
  Record: mongoose.model('Record', RecordSchema),
  Team: mongoose.model('Team', TeamSchema),
  Department: mongoose.model('Department', DepartmentSchema)
};
