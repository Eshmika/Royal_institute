// studentEnroll.js

const mongoose = require('mongoose');

const studentEnrollSchema = new mongoose.Schema({
  StudentId: {
    type: String,
    required: true
  },
  ClassId: {
    type: String,
    required: true
  }
});

const StudentEnroll = mongoose.model('StudentEnroll', studentEnrollSchema);

module.exports = StudentEnroll;
