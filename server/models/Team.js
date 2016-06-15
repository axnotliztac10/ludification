var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  Name: { type: String, required: true },
  Description: { type: String },
  Schedule: { type: Object, required: true }
});

module.exports = mongoose.model('Team', TeamSchema);