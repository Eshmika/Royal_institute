import React, { useEffect, useState } from 'react'
import {Link } from 'react-router-dom';
import './MyQuestions.css';
import axios from 'axios';

function MyQuestions() {

  const[questions,setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/MyQuestions')
    .then((res) =>{
      setQuestions(res.data);
    })
    .catch((err) => console.error(err));
  },[]);


  const handleDelete = (id) =>{
    axios.delete('http://localhost:5000/deleteQuestion/' + id)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => console.error(err));
  }

  return (
    <div>
      <label className="heading3">Connect With Your Teachers - My Questions</label>
      <ul style={{ position: 'absolute', left: '344px', top: '220px',  width: '864px', background: '#FFFFFF',  padding: '10px'}}>
        {questions.map((question, index) => (
          <li key={index} style={{ marginBottom: '20px',boxSizing: 'border-box', width: '864px', height: '191px', background: '#FFFFFF', border: '1px solid #000000'  }}>
            <strong>Question:</strong> {question.question}<br /><br/><br/>
            <strong>Answer:</strong> {question.answer}<br /><br/><br/><br/>
            <div>
              <Link to={`/UpdateQuestion/${question._id}`} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                <button style={{ width: '100px', height: '30px', background: '#6C9DE2', borderRadius: '20px', marginRight: '10px' }}>Edit</button>
              </Link>
              <button onClick={(a) => handleDelete(question._id)} style={{ width: '100px', height: '30px', background: '#6C9DE2', borderRadius: '20px' }}>Delete</button><br/><br/><br/><br/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MyQuestions