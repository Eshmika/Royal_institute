import React, { useEffect, useState } from 'react'
import './profile.css'
import home from './navbar_images/Home.png'
import classes from './navbar_images/Class.png'
import enroll from './navbar_images/Enroll.png'
import pay from './navbar_images/Pay.png'
import time from './navbar_images/Time.png'
import attendance from './navbar_images/Attendance.png'
import qa from './navbar_images/Qa.png'
import feedback from './navbar_images/Feedback.png'
import profile from './navbar_images/Profile.png'
import wallet from './navbar_images/Wallet.png'
import logout from './navbar_images/Logout.png'
import logo from './photos/logofull.png'
import userpng from './photos/User.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ManagerEnrollments from './ManagerEnrollments'
import Attendance from './Attendance'
import ClassesInput from '../../components/ClassesInput'

function ManagerClasses() {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();       
    const [secanswer, setSecAnswer] = useState();
    const [showEnrollments, setShowEnrollments] = useState(false);

     const handleEnrollmentsClick = () => {
        setShowEnrollments(true);
        
     };
    useEffect(()=>{
        axios.get('/managerprofile')
        .then((res)=>{
            setName(res.data.name);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setContactnumber(res.data.contactnumber); 
            setSecAnswer(res.data.SecAnswer);  
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handleDelete = () => {
        axios.get('/logout').then(res => {
            console.log(res);
            window.location.href = '/';
        }).catch(err => console.log(err));
    }
    
  return (
    <main>
        <div className='profilecontent'>        
            <div className='sidenavbar'>                
                <ul className='sidenavbarul'>
                    <li>
                        <img src={home} alt='home' className='navimage'/>
                        <a href='/login'>Dashboard</a>
                    </li>
                    <li>
                        <img src={classes} alt='home' className='navimage'/>
                        <a href='/login'>My Classes</a>
                    </li>
                    <li>
                        <img src={enroll} alt='home' className='navimage'/>
                        <a href='/ManagerEnrollments'>Enrollments</a>
                    </li>
                    <li>
                        <img src={pay} alt='home' className='navimage'/>
                        <a href='/login'>Payment</a>
                    </li>
                    <li>
                        <img src={time} alt='home' className='navimage'/>
                        <a href='/login'>TimeTable</a>
                    </li>
                    <li>
                        <img src={attendance} alt='home' className='navimage'/>
                        <a href='/Attendance'>Attendance</a>
                    </li>
                    <li>
                        <img src={qa} alt='home' className='navimage'/>
                        <a href='/login'>Q&A</a>
                    </li>
                    <li>
                        <img src={feedback} alt='home' className='navimage'/>
                        <a href='/login'>Feedbacks</a>
                    </li>
                    <li>
                        <img src={profile} alt='home' className='navimage'/>
                        <a href='/studentprofile'>Profile</a>
                    </li>
                    <li>
                        <img src={wallet} alt='home' className='navimage'/>
                        <a href='/login'>Wallet</a>
                    </li>
                    <br/><br/><br/><br/>
                    <li className='logoutsq'>
                        <img src={logout} alt='home' className='navimage'/>
                        <button className='logoutbtn' onClick={handleDelete}>Logout</button>
                    </li>
                </ul>
            </div>
            <div>
                <table>
                    <tr>
                        <td className='tbllogo'>
                            <img src={logo} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'><b>Hello, {name}</b><br/>Manager</p>
                        </td>
                        <td>
                            <img src={userpng} alt='logo' class='hellopic'/>
                        </td>
                    </tr>
                </table>    
                <p class='usertxt'>Manage Claasees</p> 
                <div class="line1"></div>  
                             
                <ClassesInput />
            </div>            
        </div>
    </main>
  )
}

export default ManagerClasses