import React,  { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './CreateManager.css';

function CreateManager() {

    const[TeacherName,setEnterTeacherName]=useState();
    const[TeacherID,setEnterTeacherID]=useState();
    const[SubjectName,setEnetrSubjectName]=useState();
    const[Grade,setEnterGrade]=useState();
    const[AttendStudents,setEnterEnrollStudent]=useState();
    const[FreeCardAmount,setEnterFreeCardAmount]=useState();
    const[InstitutePayment,setEnterInstitutePayment]=useState();
    const[MonthlySalary,setEnterMonthelySalary]=useState();
    const[Date,setEnetrDate]=useState();
    const navigator= useNavigate();

    const submit = (e) =>{
        e.preventDefault();
        axios.post('http://Localhost:5000/createUser',{TeacherName:TeacherName,TeacherID:TeacherID,SubjectName:SubjectName,Grade:Grade,AttendStudents:AttendStudents,FreeCardAmount:FreeCardAmount,InstitutePayment:InstitutePayment,MonthlySalary:MonthlySalary,Date:Date})
        .then(res=>{
            console.log(res);
            navigator('/');
          })
          .catch(err => console.error(err));
    }



  return (
    <div className="bodyA">
      <h12 className="h12i">Make a Salary</h12>

      <div className="container">
        <form onSubmit={submit} className="AddSalary"><br />
          <label htmlFor="an" className="labelA1">Enter Teacher Name :</label>
          <input type="text" name="acname" placeholder="Enter Name" pattern="[A-Za-z\s]+" required className="text1" onChange={(e)=>setEnterTeacherName(e.target.value)} /><br /><br />

          <label htmlFor="cname" className="labelA2">Enter Teacher ID :</label>
          <input type="text" name="itnum" placeholder="Enter ID"  required className="text2" onChange={(e)=>setEnterTeacherID(e.target.value)} /><br /><br />

          <label htmlFor="an" className="labelA3">Enter Subject Name :</label>
          <input type="text" name="acname" placeholder="Enter Subject" pattern="[A-Za-z\s]+" required className="text3"  onChange={(e)=>setEnetrSubjectName(e.target.value)}/><br /><br />

          <label htmlFor="an" className="labelA4">Enter Grade :</label>
          <input type="text" name="acnum" placeholder="Grade" pattern="[0-9]+" required className="text4" onChange={(e)=>setEnterGrade(e.target.value)} /><br /><br />

          <label htmlFor="an" className="labelA5">Enter Attend Students :</label>
          <input type="text" name="acnum" placeholder="Students" pattern="[0-9]+" required className="text5" onChange={(e)=>setEnterEnrollStudent(e.target.value)} /><br /><br />

          <label id="totalA" name="totalA" className="labelA6">Enter Free Card Amount :</label>
          <input type="text" name="amount" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="text6" onChange={(e)=>setEnterFreeCardAmount(e.target.value)} /><br /><br />

          <label id="totalA" name="totalA" className="labelA7">Enter Institute Payment :</label>
          <input type="text" name="amount" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="text7" onChange={(e)=>setEnterInstitutePayment(e.target.value)} /><br /><br />

          <label id="totalA" name="totalA" className="labelA8">Enter Monthly Salary :</label>
          <input type="text" name="amount" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="text8" onChange={(e)=>setEnterMonthelySalary(e.target.value)} /><br /><br />

          <label htmlFor="tda" className="labelA9">Enter Date :</label>
          <input type="text" name="date" placeholder="(DD/MM/YY)" pattern="(0[1-9]|1[0-9]|2[0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{2}" required className="text5" onChange={(e)=>setEnetrDate(e.target.value)} /><br /><br />

          <div className="sign1" className1="container4"><br />
            <button type="submit" name="saveandsubmit" className="buttonA3">Save and Submit</button>
            <button type="submit" name="back" className="buttonA1">Back</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateManager;
