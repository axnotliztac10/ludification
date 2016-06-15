var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  timeLabel: { type: String, required: true },
  time: { type: Date, required: true },
});

module.exports = mongoose.model('Record', RecordSchema);