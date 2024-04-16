import React, { useState } from 'react'
import './AddQuestion.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AddQuestion() {

  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();
  const [teacher, setTeacher] = useState();
  const [sid, setSid] = useState();
  const [question, setQuestion] = useState();
  const navigator = useNavigate();

  const submit = (a) =>{
    a.preventDefault();
    axios.post('http://localhost:5000/createQ', {grade:grade,subject:subject,teacher:teacher,sid:sid,question:question})
    .then(res =>{
      console.log(res);
      navigator('/');
    })
    .catch(err => console.error(err));

  }

  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <form onSubmit={submit}>
      <text className='heading2'>Connect with your teachers - Add Your Question</text>
        
        <label htmlFor="dropdown1" className='t1'>Select Grade</label>
        <select id="dropdown1" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '205px', border: '1px solid #000000', borderRadius: '10px' }} onChange={(a)=> setGrade(a.target.value)}>
          <option value="" ></option>
          <option value="Grade 9" >Grade 9</option>
          <option value="Grade 10" >Grade 10</option>
          <option value="Grade 11" >Grade11</option>
        </select>
        
        <label htmlFor="dropdown2" className='t2'>Select Subject</label>
        <select id="dropdown2" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '279px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} onChange={(a)=> setSubject(a.target.value)}>
          <option value="" ></option>
          <option value="Mathematics" >Mathematics</option>
          <option value="Science" >Science</option>
          <option value="English" >English</option>
        </select>
        
        <label htmlFor="dropdown3" className='t3'>Select Teacher</label>
        <select id="dropdown3" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '360px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} onChange={(a)=> setTeacher(a.target.value)}>
          <option value="" ></option>
          <option value="Mrs.Lakmali" >Mrs.Lakmali</option>
          <option value="Mrs.Nimal" >Mrs.Nimal</option>
          <option value="Mrs.Upul" >Mrs.Upul</option>
        </select>
        
        <text className='t5'>Student ID</text>
        <input type="text" name="sSID" style={{ boxSizing: 'border-box', position: 'absolute', width: '351px', height: '53px', left: '636px', top: '451px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} placeholder='SD001' onChange={(a)=> setSid(a.target.value)}/>
        
        <text className='t6'>Question</text>
        <input type="text" name="sQuestion" style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '219px', left: '459px', top: '610px', border: '1px solid #000000', borderRadius: '10px' }} placeholder='Enter your Question' onChange={(a)=> setQuestion(a.target.value)}/>
        
        <button name="qSubmit" style={{ position: 'absolute', width: '334px', height: '77px', left: '1045px', top: '927px', background: '#6C9DE2', borderRadius: '20px' }} className="t7">Submit</button>
      
      </form> 
    </div>
  )
}

export default AddQuestion