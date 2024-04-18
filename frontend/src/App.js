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
import TeacherTimetable from './screen/Teacher/Timetable';

import AdminManagerLogin from './screen/AdminManagerLogin';
import ManagerLogin from './screen/Manager/ManagerLogin';
import ManagerForgetPassword from './screen/Manager/Forgetpasswordmanager';
import ManagerProfile from './screen/Manager/ManagerProfile';

import AdminLogin from './screen/Admin/AdminLogin';
import AdminForgetPassword from './screen/Admin/Forgetpasswordadmin';
import AdminProfile from './screen/Admin/AdminProfile';
import AddTeacher from './screen/Admin/AddTeacher';

import Question from './screen/Question';
import AddQuestion from './screen/AddQuestion';
import UpdateQuestion from './screen/UpdateQuestion';
import MyQuestions from './screen/MyQuestions';
import FeedbackType from './screen/FeedbackType';
import TFeedback from './screen/TFeedback';
import SFeedback from './screen/SFeedback';
import Feedback from './screen/Feedback';
import MyFeedbacks from './screen/MyFeedbacks';
import THQuestion from './screen/THQuestion';
import TeacherQuestion from './screen/TeacherQuestion';
import AnswerQ from './screen/AnswerQ';
import AnswerUpdate from './screen/AnswerUpdate';
import FAskedQ from './screen/FAskedQ';
import UpdateTeacherF from './screen/UpdateTeacherF';
import UpdateSFeedback from './screen/UpdateSFeedback';
import ViewTeacherFeedback from './screen/ViewTeacherFeedback';
import ManagerFeedback from './screen/ManagerFeedback';
import ManagerNFeedback from './screen/ManagerNFeedback';
import ReplyF from './screen/ReplyF';
import MFeedbackUpdate from './screen/MFeedbackUpdate';


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
      <Route path="/teachertimetable" element={<TeacherTimetable />} />

      <Route path="/adminmanagerlogin" element={<AdminManagerLogin />} />
      <Route path="/managerlogin" element={<ManagerLogin />} />
      <Route path='/managerforgetpassword' element={<ManagerForgetPassword/>}/>
      <Route path="/managerprofile" element={<ManagerProfile />} />
      
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path='/adminforgetpassword' element={<AdminForgetPassword/>}/>
      <Route path="/adminprofile" element={<AdminProfile />} />
      <Route path="/addteacher" element={<AddTeacher />} />


      <Route path='/Question' element={<Question/>}/>
      <Route path='/AddQuestion' element={<AddQuestion/>}/>
      <Route path='/MyQuestions' element={<MyQuestions/>}/>
      <Route path='/UpdateQuestion/:id' element={<UpdateQuestion/>}/>

      <Route path='/THQuestion' element={<THQuestion/>}/>
      <Route path='/TeacherQuestion' element={<TeacherQuestion/>}/>
      <Route path='/AnswerQ/:id' element={<AnswerQ/>}/>
      <Route path='/AnswerUpdate/:id' element={<AnswerUpdate/>}/>

      <Route path='/FAskedQ' element={<FAskedQ/>}/>
      <Route path='/Feedback' element={<Feedback/>}/>
      <Route path='/FeedbackType' element={<FeedbackType/>}/>
      <Route path='/TFeedback' element={<TFeedback/>}/>
      <Route path='/SFeedback' element={<SFeedback/>}/>
      <Route path='/MyFeedbacks' element={<MyFeedbacks/>}/>
      <Route path='/UpdateTeacherF/:id' element={<UpdateTeacherF/>}/>
      <Route path='/UpdateSFeedback/:id' element={<UpdateSFeedback/>}/>
      
      <Route path='/ViewTeacherFeedback' element={<ViewTeacherFeedback/>}/>
      <Route path='/ManagerFeedback' element={<ManagerFeedback/>}/>
      <Route path='/ManagerNFeedback' element={<ManagerNFeedback/>}/>
      <Route path='/ReplyF/:id' element={<ReplyF/>}/>
      <Route path='/MFeedbackUpdate/:id' element={<MFeedbackUpdate/>}/>
            
      
    </Routes>    
    </>
  );
}

export default App;
