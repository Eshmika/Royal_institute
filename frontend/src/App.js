import { Routes, Route } from 'react-router-dom';
import StudentLogin from './screen/Student/StudentLogin';
import StudentRegister from './screen/Student/StudentRegister';
import Portal from './screen/Portal';

import StudentProfile from './screen/Student/StudentProfile';
import StudentProfileEdit from './screen/Student/StudentProfieEdit';
import StudentForgetPassword from './screen/Student/Forgetpasswordstudent';
import StudentTimetable from './screen/Student/Timetable';

import TeacherLogin from './screen/Teacher/TeacherLogin';
import TeacherProfile from './screen/Teacher/TeacherProfile';
import TeacherProfileEdit from './screen/Teacher/TeacherProfileEdit';
import TeacherForgetPassword from './screen/Teacher/Forgetpasswordteacher';

import AdminManagerLogin from './screen/AdminManagerLogin';
import ManagerLogin from './screen/Manager/ManagerLogin';
import ManagerForgetPassword from './screen/Manager/Forgetpasswordmanager';
import ManagerProfile from './screen/Manager/ManagerProfile';
import ManagerEnrollments from './screen/Manager/ManagerEnrollments';


import AdminLogin from './screen/Admin/AdminLogin';
import AdminForgetPassword from './screen/Admin/Forgetpasswordadmin';
import AdminProfile from './screen/Admin/AdminProfile';
import AddTeacher from './screen/Admin/AddTeacher';

import axios from 'axios';
import {Toaster} from 'react-hot-toast';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Portal/>}/>
      <Route path="/login" element={ <StudentLogin /> } />
      <Route path="/register" element={ <StudentRegister />} />
      <Route path="/studentprofile" element={<StudentProfile />} />
      <Route path='/studentprofileedit' element={<StudentProfileEdit/>}/> 
      <Route path='/studentforgetpassword' element={<StudentForgetPassword/>}/>
      <Route path="/studenttimetable" element={<StudentTimetable />} />
      <Route path="/teacherlogin" element={<TeacherLogin />} />
      <Route path="/teacherprofile" element={<TeacherProfile />} />
      <Route path='/teacherprofileedit' element={<TeacherProfileEdit/>}/>
      <Route path='/teacherforgetpassword' element={<TeacherForgetPassword/>}/>
      <Route path="/adminmanagerlogin" element={<AdminManagerLogin />} />
      <Route path="/managerlogin" element={<ManagerLogin />} />
      <Route path='/managerforgetpassword' element={<ManagerForgetPassword/>}/>
      <Route path="/managerprofile" element={<ManagerProfile />} />
      <Route path="/managerenrollments" element={<ManagerEnrollments />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path='/adminforgetpassword' element={<AdminForgetPassword/>}/>
      <Route path="/adminprofile" element={<AdminProfile />} />
      <Route path="/addteacher" element={<AddTeacher />} />
            
      
    </Routes>    
    </>
  );
}

export default App;
