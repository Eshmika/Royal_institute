// StudentEnrollTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentEnrollTable = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('/api/studentEnroll');
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching student enrollments:', error);
    }
  };

  return (
    <div>
      <h2>Student Enrollments</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Class ID</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment, index) => (
            <tr key={index}>
              <td>{enrollment.StudentId}</td>
              <td>{enrollment.ClassId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentEnrollTable;
