// attendanceRouter.js

const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Route to handle attendance submission
router.post('/attendance', async (req, res) => {
  try {
    const { classId, studentId, present } = req.body;

    // Create attendance record
    const attendance = new Attendance({
      classId,
      studentId,
      present
    });

    // Save attendance record to database
    await attendance.save();

    res.status(201).json(attendance);
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all attendance records
router.get('/attendance', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
