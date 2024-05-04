import React, { useEffect, useState } from 'react'
import './profile.css'
import userpng from './photos/User.png'
import axios from 'axios'
import { Link } from 'react-router-dom'


function AdminProfile() {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();       
    const [secanswer, setSecAnswer] = useState();
    
    useEffect(()=>{
        axios.get('/adminprofile')
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
   
    
  return (
    <main>
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
                            <p class='hellotxt'>{name}<br/>Admin</p>
                        </td>
                        <td>          
                            <Link to={'/searchusersadmin'}><button className='btnedit' type="submit">Search users</button> </Link>
                        </td>
                        <td>          
                            <Link to={'/addteacher'}><button className='btnedit' type="submit">Add Teacher</button> </Link>
                        </td>  
                        <td>          
                            <Link to={'/addmanager'}><button className='btnedit' type="submit">Add Manager</button> </Link>
                        </td>  
                        <td>          
                            <Link to={'/addadmin'}><button className='btnedit' type="submit">Add Admin</button> </Link>
                        </td>                        
                    </tr>
                </table>  
                <div class="line"></div>   
                <p class='userprofiletxt'>Full name</p>  
                <div className='profilebox'>{name}</div>
                <p class='userprofiletxt'>Username</p>  
                <div className='profilebox'>{username}</div>                 
                <br/>
                <div class="line"></div>
                <table>
                    <tr>
                        <td className='conatctcol'>
                            <p class='userprofiletxt'>Email Address</p>  
                            <div className='profilebox'>{email}</div>  
                        </td>
                        <td>
                            <p class='userprofiletxt'>Phone Number</p>  
                            <div className='profilebox'>{contactnumber}</div>
                        </td>
                    </tr>
                </table>
                <br/> 
                <div class="line"></div>
                <p class='userprofiletxt'>Security Question - What city were you born in?</p>  
                <div className='profilebox'>{secanswer}</div> 
                <br/>
                <div class="line"></div>               
                
            </div>            
        </div>
    </main>
  )
}

export default AdminProfile
