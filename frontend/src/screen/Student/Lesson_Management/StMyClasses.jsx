import React, { useEffect, useState } from 'react';
import { Routes } from 'react-router-dom';
import axios from 'axios';
import logo from '../photos/logofull.png'
import userpng from '../photos/User.png'
import './StMyClasses.css';
import Nav from '../NavBar/Nav';

function StMyClasses() {

  const [notices, setNotices] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState();

  useEffect(() => {
    //get notices and materials
    axios.get('http://localhost:5000/viewnotice')
      .then(res => {
        setNotices(res.data);
      })
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/showmaterials')
      .then(res => {
        setMaterials(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(()=>{
    axios.get('/studentprofile')
    .then((res)=>{
        setName(res.data.name);            
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])



  //search function
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMaterials = materials.filter(material =>
    material.lesson_topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //show file
  const showFile = (lesson_Files) => {
    window.open(`http://localhost:5000/files/${lesson_Files}`, "_blank", "noreferrer");
  };

  //download file
  const downloadFile = async (lesson_Files) => {
    try {
      const response = await axios.get(`http://localhost:5000/files/${lesson_Files}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', lesson_Files);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <>
    
      <div>
  <Nav/>
        <div className="container">          
          <div className="main-content">
          <table>
                    <tr>
                        <td className='tbllogo'>
                            <img src={logo} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'><b>Hello, {name}</b><br/>Student</p>
                        </td>
                        <td>
                            <img src={userpng} alt='logo' class='hellopic'/>
                        </td>
                    </tr>
                </table>
            <div className="class_details">
              <h2>Class Details</h2>
              <div className="class-info">
                <div className="class-title">History - Grade 10</div>
                <div className="class-detail">Teacher: Mr. Smith</div>
              </div>
            </div>
            <div className="notices">
              <h2>Notices</h2>

              {notices.map((notice) => (
                <div className="notice" key={notice._id}>
                  <div className="notice-date">{notice.date}</div>
                  <div className="notice-title">{notice.topic}</div>
                  <div className="notice-description">{notice.description}</div>


                </div>
              ))}
            </div>
            <div className="lesson-container">
              <h2>Lesson Materials</h2>

              <div className="search_bar_container">
                <input type="search" className="search_input" placeholder="Search Materials..." value={searchTerm} onChange={handleSearchChange} />
              </div>
              <div className="month">Materials for March 2024</div>
              {filteredMaterials.map((lesson) => (
                <div className="lesson" key={lesson._id}>
                  <div className="lesson-title">{lesson.lesson_topic}</div>
                  <div className="lesson-date">Date: {lesson.lesson_date}</div>
                  <div className="lesson-description">  {lesson.lesson_description}</div>
                  <button
                    className="material_view"
                    onClick={() => showFile(lesson.lesson_Files)}
                  >
                    View Material
                  </button>
                  <button
                    className="material_download"
                    onClick={() => downloadFile(lesson.lesson_Files)}
                  >
                    Download
                  </button>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Routes>

      </Routes>
    </>
  )
}

export default StMyClasses