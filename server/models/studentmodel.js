const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    idnum: {
        type: Number,
        required: true,
    }
}, { timestamps: true }); // Change 'timestamp' to 'timestamps'

const Student = mongoose.model('Student', studentSchema); // Use uppercase 'Student'

module.exports = { studentSchema, Student };
