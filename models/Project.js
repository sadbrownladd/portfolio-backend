const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  link: { type: String, default: '' },
  image: { type: String, default: '' } // Made optional with default empty string
});

module.exports = mongoose.model('Project', projectSchema);