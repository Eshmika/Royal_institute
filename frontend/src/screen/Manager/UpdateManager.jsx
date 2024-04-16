import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';


function UpdateManager() {

  const {id} = useParams();
  const[TeacherName,setEnterTeacherName]=useState();
  const[TeacherID,setEnterTeacherID]=useState();
  const[SubjectName,setEnetrSubjectName]=useState();
  const[Grade,setEnterGrade]=useState();
  const[AttendStudents,setEnterEnrollStudent]=useState();
  const[FreeCardAmount,setEnterFreeCardAmount]=useState();
  const[InstitutePayment,setEnterInstitutePayment]=useState();
  const[MonthlySalary,setEnterMonthelySalary]=useState();
  const[Date,setEnetrDate]=useState();
  const navigator = useNavigate();

  useEffect(()=>{
    axios.get('http://Localhost:5000/getUser/' + id)
    .then((res)=>{
      setEnterTeacherName(res.data.TeacherName);
      setEnterTeacherID(res.data.TeacherID);
      setEnetrSubjectName(res.data.SubjectName);
      setEnterGrade(res.data.Grade);
      setEnterEnrollStudent(res.data.AttendStudents);
      setEnterFreeCardAmount(res.data.FreeCardAmount);
      setEnterInstitutePayment(res.data.InstitutePayment);
      setEnterMonthelySalary(res.data.MonthlySalary);
      setEnetrDate(res.data.Date);

    })
    .catch((err)=> console.error(err));

  },[])

  const update = (e)=>{
    e.preventDefault();
    axios.put('http://Localhost:5000/updateUser/' +id,{TeacherName:TeacherName,TeacherID:TeacherID,SubjectName:SubjectName,Grade:Grade,AttendStudents:AttendStudents,FreeCardAmount:FreeCardAmount,InstitutePayment:InstitutePayment,MonthlySalary:MonthlySalary,Date:Date})
    .then(res =>{
      navigator('/');

    }).catch((err)=> console.error(err));
  }
  

  return (

    <div className="body">
    <h12 className="h12">Update Salary</h12>

    <div className="container">
      <form onSubmit={update} className="UpdateSalary"><br />
        <label htmlFor="an" className="label1">Enter Teacher Name :</label>
        <input type="text" name="acname" placeholder="Enter Name" value={TeacherName} pattern="[A-Za-z\s]+" required className="text1" onChange={(e)=>setEnterTeacherName(e.target.value)} /><br /><br />

        <label htmlFor="cname" className="label2">Enter Teacher ID :</label>
        <input type="text" name="itnum" placeholder="Enter ID" value={TeacherID} required className="text2" onChange={(e)=>setEnterTeacherID(e.target.value)} /><br /><br />

        <label htmlFor="an" className="label3">Enter Subject Name :</label>
        <input type="text" name="acname" placeholder="Enter Subject" value={SubjectName} pattern="[A-Za-z\s]+" required className="text3"  onChange={(e)=>setEnetrSubjectName(e.target.value)}/><br /><br />

        <label htmlFor="an" className="label4">Enter Grade :</label>
        <input type="text" name="acnum" placeholder="Grade" value={Grade} pattern="[0-9]+" required className="text4" onChange={(e)=>setEnterGrade(e.target.value)} /><br /><br />

        <label htmlFor="an" className="label5">Enter Attend Students :</label>
        <input type="text" name="acnum" placeholder="Students" value={AttendStudents} pattern="[0-9]+" required className="text5" onChange={(e)=>setEnterEnrollStudent(e.target.value)} /><br /><br />

        <label id="totalA" name="totalA" className="label6">Enter Free Card Amount :</label>
        <input type="text" name="amount" placeholder="00.00" value={FreeCardAmount} pattern="\d+(\.\d{2})?" required className="text6" onChange={(e)=>setEnterFreeCardAmount(e.target.value)} /><br /><br />

        <label id="totalA" name="totalA" className="label7">Enter Institute Payment :</label>
        <input type="text" name="amount" placeholder="00.00" value={InstitutePayment} pattern="\d+(\.\d{2})?" required className="text7" onChange={(e)=>setEnterInstitutePayment(e.target.value)} /><br /><br />

        <label id="totalA" name="totalA" className="label8">Enter Monthly Salary :</label>
        <input type="text" name="amount" placeholder="00.00" value={MonthlySalary} pattern="\d+(\.\d{2})?" required className="text8" onChange={(e)=>setEnterMonthelySalary(e.target.value)} /><br /><br />

        <label htmlFor="tda" className="label2">Enter Date :</label>
        <input type="text" name="date" placeholder="(DD/MM/YY)" value={Date} pattern="(0[1-9]|1[0-9]|2[0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{2}" required className="text5" onChange={(e)=>setEnetrDate(e.target.value)} /><br /><br />

        <div className="sign1" className1="container4"><br />
          <button type="submit" name="update" className="button3">Update</button>
          <button type="submit" name="back" className="button1">Back</button>
        </div>

      </form>
    </div>
  </div>
  )
}

export default UpdateManager
