import React, { useState } from 'react';
import axios from 'axios';

const AttendanceForm = () => {
  const [classId, setClassId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [present, setPresent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/attendance", {
        classId: classId,
        studentId: studentId,
      });
      console.log('Attendance submitted:', response.data);
      // Reset form after successful submission
      setClassId('');
      setStudentId('');
      setPresent(true);
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="classId">Class ID:</label>
        <input type="text" id="classId" value={classId} onChange={(e) => setClassId(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="studentId">Student ID:</label>
        <input type="text" id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="present">Present:</label>
        <input type="checkbox" id="present" checked={present} value={true} onChange={(e) => setPresent(e.target.checked)} />
      </div>
      <button className='btn btn-primary mr-2' type="submit">Submit Attendance</button>
    </form>
  );
};

export default AttendanceForm;
