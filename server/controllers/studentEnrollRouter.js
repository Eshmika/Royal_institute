// studentEnrollRouter.js

const express = require('express');
const router = express.Router();
const StudentEnroll = require('../models/studentEnroll');

// Route to handle student enrollment creation
router.post('/studentEnroll', async (req, res) => {
  try {
    const { StudentId, ClassId } = req.body;

    // Create student enrollment record
    const enrollment = new StudentEnroll({
      StudentId,
      ClassId
    });

    // Save student enrollment record to database
    await enrollment.save();

    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all student enrollments
router.get('/studentEnroll', async (req, res) => {
  try {
    const enrollments = await StudentEnroll.find();
    res.json(enrollments);
  } catch (error) {
    console.error('Error fetching student enrollments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
