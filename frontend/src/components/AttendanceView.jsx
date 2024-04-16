// ViewAttendanceForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAttendanceForm = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    // Fetch attendance records when component mounts
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get('http://localhost:500/api/attendance');
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Student ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map(record => (
            <tr key={record._id}>
              <td>{record.classId}</td>
              <td>{record.studentId}</td>
              <td>{new Date(record.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAttendanceForm;
