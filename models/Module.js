const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  programme_id: {
    type: String,
    required: true
  },
  module_id: {
    type: String,
    required: true
  },
  module_leader: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  published_date: {
    type: Date
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Module = mongoose.model('module', ModuleSchema);