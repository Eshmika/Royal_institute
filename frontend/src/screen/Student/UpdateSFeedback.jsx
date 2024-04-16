import React, { useEffect, useState } from 'react'
import './SFeedback.css';
import axios from 'axios';
import {Link, useParams,useNavigate} from 'react-router-dom';

function UpdateSFeedback() {

  const {id} = useParams();
  const [grade, setGrade] = useState();
  const [sfeedbacks, setSFeedbacks] = useState();
  const [date, setDate] = useState();
  const navigator = useNavigate();

  useEffect(() =>{
    //get service feedback
    axios.get('http://localhost:5000/getSFeedback/' + id)
    .then((res) =>{
      setGrade(res.data.grade);
      setSFeedbacks(res.data.feedback);
      setDate(res.data.date);
    })
    .catch((err) => console.error(err));

  },[]);

  const update = (a) =>{
    a.preventDefault();
  
  axios.put('http://localhost:5000/updateSFeedback/'+ id, {grade:grade,sfeedbacks:sfeedbacks,date:date})
    .then(res =>{
      
      navigator('/MyFeedbacks');
    })
    .catch(err => console.error(err));

  }

  return (
    <div style={{ backgroundColor: 'lightgray' }}>
    <h1 className="heading9">We Want to Hear from You - Teacher Feedback</h1>
    <form onSubmit={update}>
      <label htmlFor="grade" className="tt6">Select Grade</label>
      <select id="grade" name="dropdown" style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '53px', left: '436px', top: '268px', background: '#FFFFFF', border: '1px solid #000000' }} value={grade} onChange={(a)=> setGrade(a.target.value)}>
      <option value="" ></option>
          <option value="Grade 9" >Grade 9</option>
          <option value="Grade 10" >Grade 10</option>
          <option value="Grade11" >Grade11</option>
      </select>
      

      <label htmlFor="feedback" className="tt7">Feedback</label>
      <textarea
        id="feedback"
        style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '178px', left: '436px', top: '445px', background: '#FFFFFF', border: '1px solid #000000' }}
        value={sfeedbacks}
        onChange={(a)=> setSFeedbacks(a.target.value)}
      ></textarea>
      <label htmlFor="date" className="tt8">Enter Date</label>
      <input
        id="date"
        style={{ boxSizing: 'border-box', position: 'absolute', width: '920px', height: '53px', left: '436px', top: '755px', background: '#FFFFFF', border: '1px solid #000000' }}
        type="text"
        value={date}
        onChange={(a)=> setDate(a.target.value)}
      />
      <button
        id="sfeed"
        className="sfet"
        style={{ position: 'absolute', width: '334px', height: '77px', left: '1079px', top: '906px', background: '#6C9DE2', borderRadius: '20px' }}
      >
        Submit
      </button>
    </form>
  </div>
  )
}

export default UpdateSFeedback