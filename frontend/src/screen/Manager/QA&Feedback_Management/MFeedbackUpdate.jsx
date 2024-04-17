import React, { useEffect, useState } from 'react';
import './ReplyF.css';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

function MFeedbackUpdate() {

    const {id} = useParams();
    const [grade, setGrade] = useState();
    const [sid, setSid] = useState();
    const [feedback, setFeedback] = useState();
    const [reply, setReply] = useState();
    const navigator = useNavigate();

    useEffect(() =>{

        axios.get(`http://localhost:5000/getReply/${id}`)
        .then((res) => {
            setGrade(res.data.grade);
            setSid(res.data.sid);
            setFeedback(res.data.feedback);
            setReply(res.data.reply);
        })
        .catch((err) => console.error(err));
    },[id]); 

    

    const replyM = (event) => {
      event.preventDefault();
        axios.put(`http://localhost:5000/updateReply/${id}`, {reply:reply})
          .then((response) => {
            console.log('Answer updated:', response.data);
            navigator('/ManagerFeedback');
            // Optionally, you can update the UI to reflect the updated answer
          })
          .catch((error) => {
            console.error('Error updating answer:', error);
          });
      };

  return (
    
        
        <div>
      <text className="heading14">We Want to Hear from You - Service Feedabacks</text>

      <form onSubmit={replyM}>
        <text className="t1t">Student ID</text>
        <text style={{ boxSizing: 'border-box', position: 'absolute', width: '884px', height: '53px', left: '529px', top: '227px', background: '#FFFFFF', border: '1px solid #000000' }}>{sid}</text>
        <text className="t2t">Feedback</text>
        <text style={{ boxSizing: 'border-box', position: 'absolute', width: '884px', height: '163px', left: '528px', top: '333px', background: '#FFFFFF', border: '1px solid #000000' }}>{feedback}</text>
        <text className="t3t">Response</text>
        <input type="text" id="sfr" style={{ position: 'absolute', width: '887px', height: '253px', left: '528px', top: '554px' }} value={reply} onChange={(event) => setReply(event.target.value)}></input>

        <button id="sfrbtn" type='submit' className="sfrt" style={{ position: 'absolute', width: '334px', height: '77px', left: '1079px', top: '906px', background: '#6C9DE2', borderRadius: '20px' }}>SUBMIT </button>
      </form>
    </div>
    
    
  )
}

export default MFeedbackUpdate