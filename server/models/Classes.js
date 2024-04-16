const mongoose = require('mongoose');

const classesSchema = new mongoose.Schema({
    classId: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true },
    grade: { type: String, required: true },
    subject: { type: String, required: true },
    teacherID: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true } // Assuming you have a Teacher model
}, { timestamps: true });

const Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;
