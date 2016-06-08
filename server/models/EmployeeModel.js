var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  late: { type: Date, required: true },
  tolerancy: { type: Date, required: true },
  ontime: { type: Date, required: true }
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
  Name: { type: Number, required: true },
  Record: { type: [RecordSchema], required: false },
  Team: { type: TeamSchema, required: false },
  Department: { type: DepartmentSchema, required: false }
});

var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
