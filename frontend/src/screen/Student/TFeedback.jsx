import React, { useState } from 'react'
import './TFeedback.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function TFeedback() {

  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();
  const [teacher, setTeacher] = useState();
  const [sid, setSid] = useState();
  const [tfeedback, setTFeedback] = useState();
  const navigator = useNavigate();

  const submit = (a) =>{
    a.preventDefault();
    axios.post('http://localhost:5000/createTF', {grade:grade,subject:subject,teacher:teacher,sid:sid,feedback:tfeedback})
    .then(res =>{
      console.log(res);
      console.log( `Feedback Submitted successfully.`);
      navigator('/Feedback');
    })
    .catch(err => console.error(err));

  }

  return (
    <div>
        <body style={{ backgroundColor: 'lightgray' }}>
      <h1 className="heading8">We Want to Hear from You - Teacher Feedback</h1>
      <form onSubmit={submit}>
        
        <label htmlFor="grade" className="tt1">Select Grade</label>
        <select id="grade" name="dropdown" style={{ position: 'absolute', width: '337px', height: '37px', left: '632px', top: '200px', background: '#FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }} onChange={(a)=> setGrade(a.target.value)}>
        <option value="" ></option>
          <option value="Grade 9" >Grade 9</option>
          <option value="Grade 10" >Grade 10</option>
          <option value="Grade11" >Grade11</option>
        </select>
        
        <label htmlFor="subject" className="tt2">Select Subject</label>
        <select id="subject" name="dropdown" style={{ position: 'absolute', width: '337px', height: '37px', left: '632px', top: '264px', background: '#FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}  onChange={(a)=> setSubject(a.target.value)}>
        <option value="" ></option>
          <option value="Mathematics" >Mathematics</option>
          <option value="Science" >Science</option>
          <option value="English" >English</option>
        </select>
        
        <label htmlFor="teacher" className="tt3">Select Teacher</label>
        <select id="teacher" name="dropdown" style={{ position: 'absolute', width: '337px', height: '37px', left: '632px', top: '346px', background: '#FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }} onChange={(a)=> setTeacher(a.target.value)}>
        <option value="" ></option>
          <option value="Mrs.Lakmali" >Mrs.Lakmali</option>
          <option value="Mrs.Nimal" >Mrs.Nimal</option>
          <option value="Mrs.Upul" >Mrs.Upul</option>
        </select>
        
        <label htmlFor="studentID" className="tt4">Student ID</label>
        <input
          id="studentID"
          style={{ boxSizing: 'border-box', position: 'absolute', width: '337px', height: '53px', left: '632px', top: '448px', background: '#FFFFFF', border: '1px solid #000000' }}
          type="text"
          onChange={(a)=> setSid(a.target.value)}
        />
        <label htmlFor="feedback" className="tt5">Feedback</label>
        <textarea
          id="feedback"
          style={{ boxSizing: 'border-box', position: 'absolute', width: '914px', height: '238px', left: '465px', top: '625px', background: '#FFFFFF', border: '1px solid #000000' }}
          onChange={(a)=> setTFeedback(a.target.value)}
        ></textarea>
        <button
          id="tfeed"
          className="tfet"
          style={{ position: 'absolute', width: '334px', height: '77px', left: '1045px', background: '#6C9DE2', borderRadius: '20px' }}
        >
          Submit
        </button>
      </form>
    </body>
    </div>
  )
}

export default TFeedback