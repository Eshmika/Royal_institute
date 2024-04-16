// attendance.js

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  present: {
    type: Boolean,
    default: false // Default value for 'present' field
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set creation date
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
