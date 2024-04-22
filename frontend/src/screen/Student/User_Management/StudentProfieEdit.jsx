import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Head from '../Header/Header';
import Swal from 'sweetalert2';

function StudentProfileEdit() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [parentname, setParentName] = useState('');
    const [parentphonenumber, setParentPhonenumber] = useState('');
    const [secanswer, setSecAnswer] = useState('');
    const [profile_photo, setProfilePhoto] = useState(null);
    const [show_profile_photo, setProfilePhotoView] = useState(null);
    const [student_id, setStudent_id] = useState('');

    useEffect(() => {
        axios.get('/getstudentprofileedit')
            .then((res) => {
                setName(res.data.name);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setContactnumber(res.data.contactnumber);
                setGender(res.data.gender);
                setParentName(res.data.parentname);
                setParentPhonenumber(res.data.parentphonenumber);
                setSecAnswer(res.data.SecAnswer);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Function to delete the photo
    const handleDeletePhoto = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to delete this photo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:5000/deletephoto/'+ id)
                    .then((res) => {
                        console.log('success');
                        Swal.fire(
                            'Deleted!',
                            'Your Photo has been deleted.',
                            'success'
                        ).then(() => {
                            window.location.reload(); // Reload the page after successful deletion
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the material.',
                            'error'
                        );
                    });
            }
        });
    }
    

    const updateStudent = (e) => {
        e.preventDefault();
        axios.put('/studentprofileedit', {
            name,
            username,
            gender,
            email,
            contactnumber,
            parentname,
            parentphonenumber,
            secanswer
        })
            .then((res) => {
                navigate('/studentprofile');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onInputChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const submitImage = async (e) => {
        e.preventDefault();

        if (!profile_photo) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', profile_photo);
        formData.append('student_id', student_id);

        try {
            const response = await axios.post('/addphoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setProfilePhoto(response.data.profile_photo);
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Photo added successfully!',
                confirmButtonText: 'OK'
            });

            // Refresh the page
            navigate('/studentprofile');
        } catch (error) {
            console.error(error);

            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the Photo. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
    };


    useEffect(() => {
        getImage();
    }, []);

    const getImage = async () => {
        try {
            const result = await axios.get('/getimage');
            setProfilePhotoView(result.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <Head />
            <div className='profilecontent'>
                <div>
                    <p className='usertxt'>User Profile</p>
                    <div className="line1"></div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    {show_profile_photo === null
                                        ? ""
                                        : show_profile_photo.map((data, index) => (
                                            <div key={index}>
                                                <img
                                                    src={`http://localhost:5000/profilephotos/${data.profile_photo}`}
                                                    height={100}
                                                    width={100}
                                                    alt="profile"
                                                />
                                                <br />
                                                <button className='btnsp'  onClick={() => handleDeletePhoto(data._id)}>Delete</button>

                                            </div>
                                            
                                        ))}

                                </td>
                                <td>
                                    <p className='hellotxt'>{name}<br />Student</p>
                                </td>
                                <td>
                                    <div>
                                        <form onSubmit={submitImage}>
                                            <input type="file" accept="image/*" onChange={onInputChange} />
                                            <input type="hidden" name="student_id" value="" onChange={(e) => setStudent_id(e.target.value)} />
                                            <button className='btnsp' type="submit">Submit</button>
                                        </form>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div className="updateform">
                        <form onSubmit={updateStudent}>
                            <div className="line"></div>
                            <p className='userprofiletxt'>Full name</p>
                            <input type="text" id="name" name="name" className="profileboxshow" value={name} onChange={(e) => setName(e.target.value)} />
                            <p className='userprofiletxt'>Username</p>
                            <input type="text" id="username" name="username" className="profileboxshow" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <p className='userprofiletxt'>Gender</p>
                            <table className='gendertbl'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="radio" id="gender" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                                        </td>
                                        <td>
                                            <p className='gendertxt'>Male</p>
                                        </td>
                                        <td>
                                            <input type="radio" id="gender" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                                        </td>
                                        <td>
                                            <p className='gendertxt'>Female</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="line"></div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='conatctcol'>
                                            <p className='userprofiletxt'>Email Address</p>
                                            <input type="text" id="email" name="email" className="profileboxshow" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </td>
                                        <td>
                                            <p className='userprofiletxt'>Phone Number</p>
                                            <input type="number" id="cnumber" name="cnumber" className="profileboxshow" value={contactnumber} onChange={(e) => setContactnumber(e.target.value)} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <div className="line"></div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='conatctcol'>
                                            <p className='userprofiletxt'>Parent Name</p>
                                            <input type="text" id="pname" name="pname" className="profileboxshow" value={parentname} onChange={(e) => setParentName(e.target.value)} />
                                        </td>
                                        <td>
                                            <p className='userprofiletxt'>Parent Phone Number</p>
                                            <input type="number" id="pcnumber" name="pcnumber" className="profileboxshow" value={parentphonenumber} onChange={(e) => setParentPhonenumber(e.target.value)} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <div className="line"></div>
                            <p className='userprofiletxt'>Security Question - What city were you born in?</p>
                            <input type="text" id="qans" name="qans" className="profileboxshow" value={secanswer} onChange={(e) => setSecAnswer(e.target.value)} />
                            <br /><br />
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <button className='btnedit' type="submit">Save changes</button>
                                        </td>
                                        <td>
                                            <Link to={'/studentprofile'}><button className='btnedit'>Cancel</button></Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default StudentProfileEdit;
