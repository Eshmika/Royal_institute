import React, { useState } from 'react';
import axios from 'axios';

function ClassesInput() {
    const [classId, setClassId] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [grade, setGrade] = useState('');
    const [subject, setSubject] = useState('');
    const [teacherID, setTeacherID] = useState('');


  //  axios.post('http//localhost:5000/Manager/Addclass')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newClass = {
                classId,
                time,
                date,
                grade,
                subject,
                teacherID
            };
            // Assuming your backend route for creating classes is '/api/classes'
            const res = await axios.post('/api/classes', newClass);
            console.log(res.data);
            // Reset form fields after successful submission
            setClassId('');
            setTime('');
            setDate('');
            setGrade('');
            setSubject('');
            setTeacherID('');
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };

    return (
        <div>
            <h2>Create New Class</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Class ID:</label>
                    <input type="text" value={classId} onChange={(e) => setClassId(e.target.value)} />
                </div>
                <div>
                    <label>Time:</label>
                    <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label>Grade:</label>
                    <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} />
                </div>
                <div>
                    <label>Subject:</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div>
                    <label>Teacher ID:</label>
                    <input type="text" value={teacherID} onChange={(e) => setTeacherID(e.target.value)} />
                </div>
                <button type="submit">Create Class</button>
            </form>
        </div>
    );
}

export default ClassesInput;
