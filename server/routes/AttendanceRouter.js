const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
    attendance
    
            } = require('../controllers/attendanceRouter');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)



router.post('/Attendance', attendance)



module.exports = router;