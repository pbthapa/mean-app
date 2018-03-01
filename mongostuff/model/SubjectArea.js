var mongoose = require('mongoose');

var SubjectAreaSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SubjectArea', SubjectAreaSchema);