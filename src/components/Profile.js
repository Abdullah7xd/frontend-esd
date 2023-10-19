import React, { useState } from 'react';
import './style1.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

const Profile= () => {
    const location = useLocation()
    const {studentName,studentId,state,pinCode,phoneNumber,email,dateOfBirth,address,age,city,course} = location.state
     return (
        <div>
        <Navbar/>
        <div className="container1 student-portal m-3 mx-auto p-5 rounded mt-5 w-75">
            <div className='row dflex '>
                <div className='col-12'>
                    <h2>{studentName}</h2>
                </div>
                <div className='col-6'>
                    <h4>Course : {course}</h4>
                </div>
                <div className='col-6'>
                <h4>Student Id : {studentId}</h4>
                </div>

                <div className='col-6'>
                    <h4>Age : {age}</h4>
                </div>
                <div className='col-6'>
                <h4>D.O.B : {dateOfBirth}</h4>
                </div>

                <div className='col-6'>
                    <h4>City : {city}</h4>
                </div>
                <div className='col-6'>
                <h4>State : {state}</h4>
                </div>

            </div>
           
            

        </div>
        </div>
    )
}

export default Profile;
