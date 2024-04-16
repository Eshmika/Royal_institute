import React, { useState } from 'react';
import axios from 'axios';

const StudentEnrollForm = () => {
  const [formData, setFormData] = useState({
    StudentId: '',
    ClassId: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send enrollment data to the server
      const response = await axios.post('/api/studentEnroll', formData);
      console.log('Enrollment submitted:', response.data);
      // Reset form after successful submission
      setFormData({
        StudentId: '',
        ClassId: ''
      });
    } catch (error) {
      console.error('Error submitting enrollment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="StudentId">Student ID:</label>
        <input type="text" id="StudentId" name="StudentId" value={formData.StudentId} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="ClassId">Class ID:</label>
        <input type="text" id="ClassId" name="ClassId" value={formData.ClassId} onChange={handleChange} required />
      </div>
      <button type="submit">Enroll Student</button>
    </form>
  );
};

export default StudentEnrollForm;
