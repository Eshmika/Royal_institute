import React from 'react';
import './FeedbackType.css';
import {Link } from 'react-router-dom';

function FeedbackType() {
  return (
    <div>
        <text className="heading7">We Want to Hear from You - Add Your Feedbacks</text>
        <h4>Pick Feedback Type</h4>

        <button id="tf" className="tft1" style={{ position: 'absolute', width: '592px', height: '86px', left: '430px', top: '404px', background: '#83B2CD', borderRadius: '10px' }}><Link to="/TFeedback" style={{ textDecoration: 'none',color: '#000000' }}>TEACHER FEEDBACK</Link></button>
        <button id="sf" className="sft1" style={{ position: 'absolute', width: '592px', height: '97px', left: '430px', top: '587px', background: '#83B2CD', borderRadius: '10px' }}><Link to="/SFeedback" style={{ textDecoration: 'none',color: '#000000' }}>SERVICE FEEDBACK</Link></button>
    </div>
  )
}

export default FeedbackType