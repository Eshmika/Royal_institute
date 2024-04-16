import React, { useEffect, useState } from 'react'
import './AddQuestion.css';
import {Link, useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';

function UpdateQuestion() {

  
  const {id} = useParams();
  const [grade, setGrade] = useState();
  const [subject, setSubject] = useState();
  const [teacher, setTeacher] = useState();
  const [sid, setSid] = useState();
  const [question, setQuestion] = useState();
  const navigator = useNavigate();


  useEffect(() =>{
    axios.get('http://localhost:5000/getQuestion/' + id)
    .then((res) =>{
      setGrade(res.data.grade);
      setSubject(res.data.subject);
      setTeacher(res.data.teacher);
      setSid(res.data.sid);
      setQuestion(res.data.question);
    })
    .catch((err) => console.error(err));
  },[]);

  const update = (a) =>{
    a.preventDefault();
    axios.put('http://localhost:5000/updateQuestion/'+ id, {grade:grade,subject:subject,teacher:teacher,sid:sid,question:question})
    .then(res =>{
      
      navigator('/MyQuestions');
    })
    .catch(err => console.error(err));

  }

  return (
    <div>
      <form onSubmit={update}>
     
      <text className='heading2'>Connect with your teachers - Add Your Question</text>
        
        <label htmlFor="dropdown1" className='t1'>Select Grade</label>
        <select id="dropdown1" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '205px', background: '#FFFFFF',border: '1px solid #000000', borderRadius: '10px'  }} value={grade} onChange={(a)=> setGrade(a.target.value)}>
          <option value="" ></option>
          <option value="Grade 9" >Grade 9</option>
          <option value="Grade 10" >Grade 10</option>
          <option value="Grade 11" >Grade 11</option>
        </select>
        
        <label htmlFor="dropdown2" className='t2'>Select Subject</label>
        <select id="dropdown2" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '279px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} value={subject} onChange={(a)=> setSubject(a.target.value)}>
          <option value="" ></option>
          <option value="Mathematics" >Mathematics</option>
          <option value="Science" >Science</option>
          <option value="English" >English</option>
        </select>
        
        <label htmlFor="dropdown3" className='t3'>Select Teacher</label>
        <select id="dropdown3" name="dropdown" style={{ position: 'absolute', width: '351px', height: '40px', left: '632px', top: '360px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} value={teacher} onChange={(a)=> setTeacher(a.target.value)}>
          <option value="" ></option>
          <option value="Mrs.Lakmali" >Mrs.Lakmali</option>
          <option value="Mrs.Nimal" >Mrs.Nimal</option>
          <option value="Mrs.Upul" >Mrs.Upul</option>
        </select>
        
        <text className='t5'>Student ID</text>
        <input type="text" name="sSID" style={{ boxSizing: 'border-box', position: 'absolute', width: '351px', height: '53px', left: '636px', top: '451px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} placeholder='SD001' value={sid} onChange={(a)=> setSid(a.target.value)}/>
        
        <text className='t6'>Question</text>
        <input type="text" name="sQuestion" style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '219px', left: '459px', top: '610px', border: '1px solid #000000', borderRadius: '10px' }} placeholder='Enter your Question' value={question} onChange={(a)=> setQuestion(a.target.value)}/>
        
        <button name="qSubmit" style={{ position: 'absolute', width: '334px', height: '77px', left: '1045px', top: '927px', background: '#6C9DE2', borderRadius: '20px' }} className="t7">Submit</button>
      
      </form>
    </div>
  )
}

export default UpdateQuestion