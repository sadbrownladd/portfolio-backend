const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false, // Made optional to match controller flexibility
    default: '',    // Default to empty string if not provided
  },
  company: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // Made optional to match controller flexibility
    default: '',    // Default to empty string if not provided
  },
  role: {
    type: String,
    required: false, // Optional field to handle frontend input
    default: '',    // Default to empty string if not provided
  },
});

module.exports = mongoose.model('Experience', experienceSchema);