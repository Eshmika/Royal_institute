import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubject = () => {
    const [subjectName, setSubjectName] = useState('');
    const [grade, setGrade] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        // Fetch all registered teachers when component mounts
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('/getteachersadmin');
                setTeachers(response.data.teachers);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/subjects', {
                subjectName,
                grade,
                teacherName
            });
            // Optionally, you can redirect or show a success message
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    return (
        <div>
            <h2>Add Subject</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Subject Name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
                <input type="number" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
                <select value={teacherName} onChange={(e) => setTeacherName(e.target.value)}>
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
                    ))}
                </select>
                <button type="submit">Add Subject</button>
            </form>
        </div>
    );
};

export default AddSubject;
