import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Test.css';
import axios from 'axios';

function Test() {
 
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios.get('/studentprofile')
      .then((res) => {
     
        const targetGrade = res.data.grade;
        axios.get('/viewSubject')
          .then((res) => {
            const gradeSubjects = res.data.filter(subject => subject.grade === targetGrade);
            setSubjects(gradeSubjects);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className='bodyvc'>
        <h1 className='h1vc'><br />My Subjects</h1>
        <div className="tbl-headervc">
          <table className='tabletc'>
            <thead>
              <tr>
                <th className='thvc'>Subject Code</th>
                <th className='thvc'>Subject Name</th>
                <th className='thvc'>Actions</th>
                <th></th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-contentvc">
          <table className='tabletc'>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject._id}>
                  <td className='tdvc'>{subject.sbid}</td>
                  <td className='tdvc'>{subject.subjectname}</td>
                  <td className='tdvc'>
                    <Link to={`/viewclass/${subject.subjectname}`}>
                      <input className="buttonvo5" type="button" name="edit" value="View Class" />
                    </Link>
                  </td>
                  <td className='tdvc'>
                    <Link to={`/viewschedule/${subject.subjectname}`}>
                      <input className="buttonvo5" type="button" name="edit" value="View schedule" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Test;
