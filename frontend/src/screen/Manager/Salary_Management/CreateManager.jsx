import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateManager.css';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import Head from '../Header/Header';

function CreateManager() {
  // const [TeacherName, setTeacherName] = useState('');
  const [TeacherID, setTeacherID] = useState('');
  const [SubjectName, setSubjectName] = useState('');
  const [Grade, setGrade] = useState('');
  const [AttendStudents, setAttendStudents] = useState('');
  const [FreeCardAmount, setFreeCardAmount] = useState('');
  const [InstitutePayment, setInstitutePayment] = useState('');
  const [MonthlySalary, setMonthlySalary] = useState('');
  const [Date, setDate] = useState('');
  const [uploadPaymentFiles, setUploadPaymentFiles] = useState(null);
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', uploadPaymentFiles);
    formData.append('TeacherName', teacher);
    formData.append('TeacherID', TeacherID);
    formData.append('SubjectName', SubjectName);
    formData.append('Grade', Grade);
    formData.append('AttendStudents', AttendStudents);
    formData.append('FreeCardAmount', FreeCardAmount);
    formData.append('InstitutePayment', InstitutePayment);
    formData.append('MonthlySalary', MonthlySalary);
    formData.append('Date', Date);

    try {
      const response = await axios.post('http://localhost:5000/createSalary', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Assuming backend returns some data
      Swal.fire({
        title: "Salary is Confirmed",
        icon: "success",
      });
      handleClick2();
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while submitting the form. Please try again later.",
        icon: "error",
      });
    }
  };

  const calculateMonthlySalary = () => {
    const monthlySalary = (parseFloat(AttendStudents) * parseFloat(1000)) - (parseFloat(FreeCardAmount) + parseFloat(InstitutePayment));
    setMonthlySalary(monthlySalary.toFixed(2));
  };

  const handleClick2 = () => {
    toast.loading('Salary is processing...', {
      style: {
        background: 'black',
        color: '#ffffff',
        borderRadius: '10px',
        border: '2px solid #ffffff',
      },
    });

    setTimeout(() => {
      toast.dismiss();
      setTimeout(() => {
        toast.success('Salary is completed!', {
          style: {
            background: '#28a745',
            color: '#ffffff',
            borderRadius: '10px',
            border: '2px solid #ffffff',
          },
          duration: 2000,
          iconTheme: {
            primary: '#ffffff',
            secondary: '#28a745',
          },
        });
        setTimeout(() => {
          navigator('/homemain');
        }, 2500);
      }, 2500);
    }, 5000);
  };

  const [teacheridd, setteacheridd] = useState([]);
  const [teacher, setTeacher] = useState();

  useEffect(()=>{
    axios.get('/teacherprofileall')
    .then((res)=>{
        setteacheridd(res.data);             
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])


  useEffect(() => {
    if (teacher) {
      axios.get('/teacherprofileall')
        .then(res => {
          const selectedTeacher = res.data.find(t => t.name === teacher);
          if (selectedTeacher) {
            setSubjectName(selectedTeacher.subject);
            setTeacherID(selectedTeacher.teid);
          }
        })
        .catch(err => console.error(err));
    }
  }, [teacher]);

  

  return (
    <div>
      <Head />
      <Toaster />
      <div className="bodyA">
        <h12 className="h12i">Make a Salary</h12>
        <br />

        <div className="container">
          <form onSubmit={handleSubmit} className="AddSalary"><br />
            <label htmlFor="teacherName" className="labelA1">Enter Teacher Name:</label>
            {/* <input type="text" id="teacherName" name="teacherName" placeholder="Enter Name" required className="text1" onChange={(e) => setTeacherName(e.target.value)} /> */}
            <select id="dropdown3" name="dropdown" style={{ width: '250px', height: '40px', background: '#FFFFFF', border: '1px solid #000000', borderRadius: '10px' }} required onChange={(a)=> setTeacher(a.target.value)}>
              <option value=""></option>
              {teacheridd.map((teacher, index) => (
                <option key={index} value={teacher.name}>{teacher.name}</option>
              ))}
            </select>
            
            <br /><br />

            <label htmlFor="teacherID" className="labelA2">Enter Teacher ID:</label>
            <input type="text" id="teacherID" name="teacherID" placeholder="Enter ID" required className="text1" value={TeacherID} onChange={(e) => setTeacherID(e.target.value)} /><br /><br />

            <label htmlFor="subjectName" className="labelA3">Enter Subject Name:</label>
            <input type="text" id="subjectName" name="subjectName" placeholder="Enter Subject" required className="text1" value={SubjectName} onChange={(e) => setSubjectName(e.target.value)} /><br /><br />

            <label htmlFor="grade" className="labelA4">Enter Grade:</label>
            <input type="text" id="grade" name="grade" placeholder="Grade" required className="text1" onChange={(e) => setGrade(e.target.value)} /><br /><br />

            <label htmlFor="attendStudents" className="labelA5">Enter Attend Students:</label>
            <input type="text" id="attendStudents" name="attendStudents" placeholder="Students" required className="text1" onChange={(e) => setAttendStudents(e.target.value)} /><br /><br />

            <label htmlFor="freeCardAmount" className="labelA6">Enter Free Card Amount:</label>
            <input type="text" id="freeCardAmount" name="freeCardAmount" placeholder="00.00" required className="text1" onChange={(e) => setFreeCardAmount(e.target.value)} /><br /><br />

            <label htmlFor="institutePayment" className="labelA7">Enter Institute Payment:</label>
            <input type="text" id="institutePayment" name="institutePayment" placeholder="00.00" required className="text1" onChange={(e) => setInstitutePayment(e.target.value)} /><br /><br />

            <br /><br />
            <button type="button" name="calculate" className="buttonA7" onClick={calculateMonthlySalary}>
              Calculate
            </button>
            <br /><br />

            <label id="totalA" name="totalA" className="labelA8">Enter Monthly Salary :</label>
            <input type="text" name="amount" placeholder="00.00" pattern="\d+(\.\d{2})?" required className="text1" onChange={(e) => setMonthlySalary(e.target.value)} /><br /><br />

            <label htmlFor="date" className="labelA9">Enter Date:</label>
            <input type="text" id="date" name="date" placeholder="(DD/MM/YY)" pattern="(0[1-9]|1[0-9]|2[0-9]|3[0-1])/(0[1-9]|1[0-2])/\d{2}" required className="text1" onChange={(e) => setDate(e.target.value)} /><br /><br />

            <label htmlFor="fileInput" className="labelA10">
              Upload Payment Files:
              <input
                id="fileInput"
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                required
                onChange={(e) => setUploadPaymentFiles(e.target.files[0])}
              />
            </label>

            <div className="sign1" className1="container4"><br />
              <button type="submit" name="saveandsubmit" className="buttonA3">Save and Submit</button>
              <button type="button" name="back" className="buttonA1" onClick={() => navigator('/homemain')} >Back</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateManager;
