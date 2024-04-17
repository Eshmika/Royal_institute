import React, { useState,useEffect } from 'react';
import './profile.css'
import userpng from './photos/User.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Head from '../Header/Header'
// import toast from 'react-hot-toast';

function TeacherProfileEdit() {
    const navigate = useNavigate();    
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();
    const [subject, setSubject] = useState();
    const [secanswer, setSecAnswer] = useState();
    // const [password, setPassword] = useState();
    // const [repassword, setRepassword] = useState();

    useEffect(()=>{
        axios.get('/getteacherprofileedit')
        .then((res)=>{
            setName(res.data.name);
            setUsername(res.data.username);            
            setEmail(res.data.email);
            setContactnumber(res.data.contactnumber);
            setSubject(res.data.subject);
            setSecAnswer(res.data.SecAnswer);  
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const updateStudent = (e) => {
        e.preventDefault();
        // if (password !== repassword) {
        //     toast.error('Passwords do not match');
        //     return;
        // }
        // else{
            axios.put('/teacherprofileedit', {
                name: name,
                username: username,
                gender: gender,
                email: email,
                contactnumber: contactnumber,
                subject: subject,
                SecAnswer: secanswer,
                // password: password
            })
            .then((res)=>{
                navigate('/teacherprofile');
            })
            .catch((err)=>{
                console.log(err);
            })
        // }
    }


    
  return (
    <main>
         <Head/>
        <div className='profilecontent'>
            
            <div>
                 
                <p class='usertxt'>User Profile</p> 
                <div class="line1"></div>  
                <table>
                    <tr>
                        <td>
                            <img src={userpng} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'>{name}<br/>Teacher</p>
                        </td>
                        <td>
                           <form > 
                                <button className='btnup' type="submit">Upload New Photo </button>
                           </form>
                        </td>
                        <td>
                            <button className='btnedit' type="submit">Delete</button>
                        </td>
                    </tr>
                </table> 
                <div class="updateform">
                <form onSubmit={updateStudent}>
                    <div class="line"></div>   
                    <p class='userprofiletxt'>Full name</p>  
                    <input type="text" id="name" name="name" class="profileboxshow" value={name} onChange={(e) => setName(e.target.value)} />  
                    <p class='userprofiletxt'>Username</p>  
                    <input type="text" id="username" name="username" class="profileboxshow" value={username} onChange={(e) => setUsername(e.target.value)}/> 
                    <p class='userprofiletxt'>Gender</p>  
                    <table class='gendertbl'>
                        <tr>
                            <td>
                                <input type="radio" id="gender" name="gender" value="Male" onChange={(e) => setGender(e.target.value)}/>
                            </td>
                            <td>
                                <p class='gendertxt'>Male</p>
                            </td>  
                            <td>
                                <input type="radio" id="gender" name="gender" value="Female" onChange={(e) => setGender(e.target.value)}/>
                            </td>
                            <td>
                                <p class='gendertxt'>Female</p>
                            </td>
                        </tr>
                    </table>
                    <div class="line"></div>
                    <table>
                        <tr>
                            <td className='conatctcol'>
                                <p class='userprofiletxt'>Email Address</p>  
                                <input type="text" id="email" name="email" class="profileboxshow" value={email} onChange={(e) => setEmail(e.target.value)}/>  
                            </td>
                            <td>
                                <p class='userprofiletxt'>Phone Number</p>  
                                <input type="number" id="cnumber" name="cnumber" class="profileboxshow" value={contactnumber} onChange={(e) => setContactnumber(e.target.value)}/>  
                            </td>
                        </tr>
                    </table>
                    <br/>
                    <div class="line"></div>
                    <table>
                        <tr>                            
                            <td>
                                <p class='userprofiletxt'>Subject</p>  
                                <input type="text" id="subject" name="subject" class="profileboxshow" value={subject} onChange={(e) => setSubject(e.target.value)}/>  
                            </td>
                        </tr>
                    </table>
                    <br/>
                    <div class="line"></div>
                    <p class='userprofiletxt'>Security Question - What city were you born in?</p>  
                    <input type="text" id="qans" name="qans" class="profileboxshow" value={secanswer} onChange={(e) => setSecAnswer(e.target.value)}/>  
                    <br/><br/>
                    {/* <div class="line"></div>
                    <p class='userprofiletxt'>New Password</p>  
                    <input type="text" id="npassword" name="npassword"  class="profileboxshow" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <p class='userprofiletxt'>Confirm New Password</p>  
                    <input type="text" id="cnpassword" name="cnpassword"  class="profileboxshow" value={repassword} onChange={(e) => setRepassword(e.target.value)}/>
                    <br/><br/> */}
                    <table>
                        <tr>
                            <td>
                                <button className='btnedit' type="submit">Save changes</button> 
                            </td>
                            <td>                                 
                                <Link to={'/teacherprofile'}><button className='btnedit' >Cancel</button> </Link>      
                            </td>
                        </tr>
                    </table>
                </form>
                </div> 
            </div>            
        </div>
    </main>
  )
}

export default TeacherProfileEdit
