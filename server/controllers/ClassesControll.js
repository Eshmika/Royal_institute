const express = require('express');
const router = express.Router();
const Classes = require('../models/Classes');

// Create a new class
router.post('/', async (req, res) => {
    try {
        const { classId, time, date, grade, subject, teacherID } = req.body;
        const newClass = new Classes({ classId, time, date, grade, subject, teacherID });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all classes
router.get('/', async (req, res) => {
    try {
        const classes = await Classes.find();
        res.json(classes);
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single class by ID
router.get('/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        const classInfo = await Classes.findById(classId);
        if (!classInfo) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(classInfo);
    } catch (error) {
        console.error('Error fetching class:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a class by ID
router.put('/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        const { time, date, grade, subject, teacherID } = req.body;
        const updatedClass = await Classes.findByIdAndUpdate(classId, { time, date, grade, subject, teacherID }, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(updatedClass);
    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a class by ID
router.delete('/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        const deletedClass = await Classes.findByIdAndDelete(classId);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
