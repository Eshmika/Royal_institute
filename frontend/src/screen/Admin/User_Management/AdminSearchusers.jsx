import React, { useEffect, useState } from 'react'
import './profile.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'


function AdminSearchusers() {
    const [, setName] = useState();    
    const [student, setStudent] = useState([]);   
    const [teacher, setTeacher] = useState([]);   
    const [searchstudent, setSearchStudent] = useState('');
    const [searchteacher, setSearchTeacher] = useState('');
    
    useEffect(() => {
        axios.get('/getstudentsadmin')
        .then((res) => setStudent(res.data))
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('/getteachersadmin')
        .then((res) => setTeacher(res.data))
        .catch((err) => {
            console.log(err);
        })
    }, [])
    
    useEffect(()=>{
        axios.get('/adminprofile')
        .then((res)=>{
            setName(res.data.name);            
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const studentDelete = (id) =>{
        axios.delete('/deletestudent/'+id)
        .then((res)=>{
            window.location.reload();        
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const teacherDelete = (id) =>{
        axios.delete('/deleteteacher/'+id)
        .then((res)=>{
            window.location.reload();        
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    
  return (
    <main>
        <div className='profilecontent'>        
           
            <div>                
                <br/>
                <p class='usertxt'>Student Details</p> 
                <div class="line1"></div>  
                <div>
                    <table>
                        <tr>
                            <td class="searchbarcol">
                                <input type="text" id="search" name="search" placeholder="Search student name..." class="searchbar" onChange={(e)=> setSearchStudent(e.target.value)}/>
                            </td>
                            {/* <td>
                            <button className='btnedit' type="submit">Search</button>
                            </td>*/}
                        </tr>
                    </table>   
                    <br/>
                    <table className='searchtablemain'>
                        <tr>
                            <th className='searchtable'>Student ID</th>
                            <th className='searchtable'>Student Name</th>
                            <th className='searchtable'>Email</th>
                            <th className='searchtable'>Phone</th>
                            <th className='searchtable'>Grade</th>
                            <th className='searchtable'>Username</th>
                            <th className='searchtable'>Gender</th>
                            <th className='searchtable'>Parent name</th>
                            <th className='searchtable'>Parent phonenumber</th>
                            <th className='searchtable'>Security Answer</th>
                        </tr>
                        {student.filter((student) => {
                            return searchstudent.toLowerCase() === '' ? student : student.name.toLowerCase().includes(searchstudent)
                        }).map((student) => (
                            <tr>
                                <td className='searchtable'>{student.stdid}</td>
                                <td className='searchtable'>{student.name}</td>
                                <td className='searchtable'>{student.email}</td>
                                <td className='searchtable'>{student.contactnumber}</td>
                                <td className='searchtable'>{student.grade}</td>
                                <td className='searchtable'>{student.username}</td>
                                <td className='searchtable'>{student.gender}</td>
                                <td className='searchtable'>{student.parentname}</td>
                                <td className='searchtable'>{student.parentphonenumber}</td>
                                <td className='searchtable'>{student.SecAnswer}</td>
                                <td>
                                    <Link to={`/updatestudent/${student.stdid}`}>
                                        <button className='btnupdate' >Update</button>                                       
                                    </Link>
                                </td>
                                <td><button className='btndelete' onClick={(e) => studentDelete(student._id)}>Delete</button></td>
                            </tr>
                        ))}

                    </table>                 
                </div>
                <br/>
                <p class='usertxt'>Teacher Details</p> 
                <div class="line1"></div> 
                <div>
                    <table>
                        <tr>
                            <td class="searchbarcol">
                                <input type="text" id="search" name="search" placeholder="Search teacher name..." class="searchbar" onChange={(e)=> setSearchTeacher(e.target.value)}/>
                            </td>
                            {/* <td>
                            <button className='btnedit' type="submit">Search</button>
                            </td>*/}
                        </tr>
                    </table>   
                    <br/>
                    <table className='searchtablemain'>
                        <tr>
                        <th className='searchtable'>Teacher ID</th>
                            <th className='searchtable'>Teacher Name</th>
                            <th className='searchtable'>Email</th>
                            <th className='searchtable'>Phone</th>
                            <th className='searchtable'>Username</th>
                            <th className='searchtable'>Gender</th>  
                            <th className='searchtable'>Subject</th>                            
                            <th className='searchtable'>Security Answer</th>
                        </tr>
                        {teacher.filter((teacher) => {
                            return searchteacher.toLowerCase() === '' ? teacher : teacher.name.toLowerCase().includes(searchteacher)
                        }).map((teacher) => (
                            <tr>
                                <td className='searchtable'>{teacher.teid}</td>
                                <td className='searchtable'>{teacher.name}</td>
                                <td className='searchtable'>{teacher.email}</td>
                                <td className='searchtable'>{teacher.contactnumber}</td>
                                <td className='searchtable'>{teacher.username}</td>
                                <td className='searchtable'>{teacher.gender}</td>  
                                <td className='searchtable'>{teacher.subject}</td>                                
                                <td className='searchtable'>{teacher.SecAnswer}</td>
                                <td><button className='btnupdate' >Update</button></td>
                                <td><button className='btndelete' onClick={(e) => teacherDelete(teacher._id)}>Delete</button></td>
                            </tr>
                        ))}

                    </table>                 
                </div>
                <br/><br/>
            </div>            
        </div>
    </main>
  )
}

export default AdminSearchusers
