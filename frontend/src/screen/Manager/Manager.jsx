import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Manager.css';

function Manager() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deleteUser/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const filteredUsers = users.filter((user) => {
    return user.TeacherName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='bodykn1'>
                <h1 className='h1kn'><br></br>My Salary</h1>
                <br /><br /><br /><br />
                <div className="search_bar_container1">
      <input
        type="search"
        className='search_input'
        placeholder="Search by teacher name..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

    
      <br></br>
      <div>

     
      <table border={1} className='.tbl-headerkn'>
        <tr>
          <th>Teacher Name</th>
          <th>Teacher ID</th>
          <th>Subject Name</th>
          <th>Grade</th>
          <th>Attend Students</th>
          <th>Free Card Amount</th>
          <th>Institute Payment</th>
          <th>Monthly Salary</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
       </table>
       </div>
       
       <table border={1} className='.tbl-headerkn'>
        {filteredUsers.map((user) => (
          <tr key={user._id}>
            <td>{user.TeacherName}</td>
            <td>{user.TeacherID}</td>
            <td>{user.SubjectName}</td>
            <td>{user.Grade}</td>
            <td>{user.AttendStudents}</td>
            <td>{user.FreeCardAmount}</td>
            <td>{user.InstitutePayment}</td>
            <td>{user.MonthlySalary}</td>
            <td>{user.Date}</td>
            <td>
              <Link to={`/update/${user._id}`}>Update</Link>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
    </div>
  
  );
}

export default Manager;
