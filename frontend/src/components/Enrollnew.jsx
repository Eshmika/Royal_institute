import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { BsInfoCircle } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentCardEnroll from './StudentCardEnroll';
import '../components/sasi.scss';

function Enrollnew() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [contactnumber, setContactnumber] = useState();       
  const [secanswer, setSecAnswer] = useState();
  const [showEnrollments, setShowEnrollments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/Enrollnew')
      .then((response) => {
        if (response.data) {
          setName(response.data._id);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setContactnumber(response.data.contactnumber); 
          setSecAnswer(response.data.SecAnswer);  
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setLoading(false);
      });
      
    axios.get('/Enrollnew')
      .then((response) => {
        if (response.data) {
          const filteredResponse = response.data.filter(
            (student) =>
              student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              student._id.toString().toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredResponse(filteredResponse);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
        setLoading(false);
      });
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStudentClick = (studentId) => {
    setSelectedStudent(studentId);
  };

  return (
    <div>
      <div className='Enroll'>
        <center>
          <div className='para'>
            <h1 className='text-4x1'>Manage Students Classes Enrollments</h1><br />
            <p>
              Thank you for visiting our website! We are excited to have you here. Our website
              aims to provide valuable information and resources to our users.<br/>
              Whether you're a new visitor or returning, we hope you find what you're looking
              for and have a pleasant experience navigating our site.
            </p>
          </div>
        </center>

        <div className="grid grid-cols-3">
          <div>
            <div className='p-5'>
              <div className='flex justify-between items-center mb-'>
                <h1 className='text-3xl'>Registered Students</h1>
              </div>

              <div className="mb-5 w-50">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search by student name"
                  className="form-control"
                />
              </div>

              {loading ? (
                <Spinner />
              ) : filteredResponse.length > 0 ? (
                <table className='w-100 border-separate border-spacing-2'>
                  <thead>
                    <tr>
                      <th scope="col" className='border border-slate-600 rounded-md text-center'>Student ID</th>
                      <th scope="col" className='border border-slate-600 rounded-md text-center'>Student Name</th>
                      <th scope="col" className='border border-slate-600 rounded-md text-center'>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResponse.map((student) => (
                      <tr key={student._id} className='h-8'>
                        <td className='border border-slate-700 rounded-md text-center'>{student._id}</td>
                        <td className='border border-slate-700 rounded-md text-center'>{student.name}</td>
                        <td className='border border-slate-700 rounded-md text-center'>
                          <div className='flex justify-center gap-x-4'>
                            <BsInfoCircle className='text-2xl text-blue-800' onClick={() => handleStudentClick(student._id)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No students available</div>
              )}
            </div>
          </div>
          <div>
            <div className='studentd'>
              {selectedStudent && <StudentCardEnroll studentId={selectedStudent} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enrollnew;
