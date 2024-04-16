import React, { useEffect, useState } from 'react';
import pp from '../assets/icons8-user.gif';
import axios from 'axios';
import '../components/sasi.scss';

const StudentCardEnroll = ({ studentId }) => {
  const [studentData, setStudentData] = useState(null);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const studentResponse = await axios.get(`http://localhost:3000/student/${studentId}`);
        setStudentData(studentResponse.data.data);

        const enrollResponse = await axios.get(`http://localhost:3000/enroll/${studentId}`);

        setEnrolledClasses(enrollResponse.data);
        setLoading(false);
        console.log(enrolledClasses);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const handleUnenroll = async (enrollmentId) => {
    try {
      await axios.delete('http://localhost:5000/enroll/${enrollmentId}');
      
      // Refetch the enrolled classes after deletion
      const enrollResponse = await axios.get(`http://localhost:5000/enroll/${studentId}`);
      // Assuming the response data is an array of enrollments
      setEnrolledClasses(enrollResponse.data); 
    } catch (error) {
      console.error('Error unenrolling:', error);
    }
  };
  
  

  return (
    <div className='stdcard'>
      <div className="card">
        <div className="card-header">
          <h2>Student Id: {studentId}, {studentData ? studentData.id : ''}</h2>
        </div>
        <div className="card-body">
          <img src={pp} alt="Student" className="student-image" />
          {studentData && (
            <div className='dtlis'>
              <p><strong>Student Name:</strong> {studentData.name}</p>
              <p><strong>ID Number:</strong> {studentData.idnum}</p>
              <p><strong>Grade:</strong> {studentData.grade}</p>
              <p><strong>School:</strong> {studentData.school}</p>
            </div>
          )}

          <table className="studentenroll-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Teacher</th>
                <th>Time</th>
                <th>Date</th>
                <th>Unenroll</th>
                
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : (
                enrolledClasses?.map((enrollment) => (
                  <tr key={enrollment._id}>
                    <td>{enrollment.class}</td>
                    <td>{enrollment.teacher}</td>
                    <td>{enrollment.time}</td>
                    <td>{enrollment.date}</td>
                    
                    <td> <button 
                        className="btn btn-danger mr-2"
                        onClick={() => handleUnenroll(enrollment._id)}
                      >
                        Unenroll
                      </button></td>
                    
                  </tr>
                ))
              )}
            </tbody>
          </table><center>
          <button className="btn btn-primary mr-2">Enroll To new Class</button></center>
        </div>
      </div>
    </div>
  );
};

export default StudentCardEnroll;
