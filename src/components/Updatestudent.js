import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AbortedDeferredError, Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import Swal from 'sweetalert2';

const Updatestudent = () => {

  const location = useLocation()
  console.log(location.state);

  const [id, setStudentId] = useState(location.state.studentId);
  const [studentname, setStudentName] = useState(location.state.studentName);
  
  const [age, setAge] = useState(location.state.age);
  const [dateOfBirth, setDateOfBirth] = useState(location.state.dateOfBirth);
  const [address, setAddress] = useState(location.state.address);
  
  const [showErrNum,setShowErrNum] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(location.state.phoneNumber);

  const [course,setCourseName] = useState(location.state.course)
  const [showErrStudentName,setshowErrStudentName] =useState(false)

  const navigate = useNavigate();
  const handleNumChange = (e)=>{
    const num = e.target.value
    const numisValid = /^[1-9][0-9]{9}$/.test(num)
    const onlyNumber = /^[0-9]*$/.test(num)
    console.log(numisValid)
    if (!numisValid && !onlyNumber){
        setShowErrNum(true)
    } else if(onlyNumber && num.length <=10 && num[0] !== '0' ){
        setShowErrNum(false)
        setStudentName(num)
    }
    
}
const handleStudentNameChange = (e) =>{
  const studentname = e.target.value
  const valid = /^[a-zA-Z ]{0,30}$/.test(studentname)
  if(valid){
    setshowErrStudentName(false)
    setStudentName(studentname) 
                  
  } else {
     
    setStudentName(true)
  }
  console.log(valid)
}

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(
      `http://fiery-advice-production.up.railway.app/student/${id}`,
      {
        studentname: studentname,
        phoneNumber: phoneNumber,
        age: age,
        dateOfBirth: dateOfBirth, 
        address: address,
        course:course,
        // email:"hello@gmail.com",
        // city:"city",
        // state:"UP",
        // piCode:"123433",
        // course:"hello"
      }
    ).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Student Updated Successfully!!',
      });
      navigate("/students");
    }).catch(e=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.message,
      });
    })
  };





  return (
    <div>
      <Navbar />

      <section className="" style={{ backgroundColor: "#eee", minHeight: '100vh' }}>
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black p-0 m-5 " style={{ borderRadius: 25 }}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Update Student
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleUpdate}
                      >
                        <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user fa-lg me-3 mt-5 fa-fw"></i>
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Student Name
                            </label>
                            <input required
                              type="text"
                              name="studentname"
                              value={studentname} 
                              onChange={handleStudentNameChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-envelope fa-lg me-3 mt-5 fa-fw" />
                          <div className="flex-fill mb-0">
                            <label 
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Phone Number
                            </label>
                            <input
                              type="number" required
                              value={phoneNumber}
                              className="form-control"
                              onChange={handleNumChange}
                            />
                            {showErrNum && <small className="form-text text-danger">It should contain numbers only</small> }
                          </div>
                          
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                        <i class="fa-solid fa-calendar-days fa-lg me-3 mt-5 fa-fw"></i>                         
                          <div className='row'>
                          <div className="col-6">
                            <label 
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              D.O.B
                            </label>
                            <input
                              type="date" required
                              value={dateOfBirth}
                              className="form-control"
                              onChange={(e)=>setDateOfBirth(e.target.value)}
                            />
                          </div>
                          <div className='col-6'>
                            <div className="form-group">
                              <label className='form-label'>Course</label>
                              <select class="form-select" onChange={(e) => setCourseName(e.target.value)} value={course} aria-label="Default select example">
                                <option selected disabled>Select Course</option>
                                <option value="B.tech(AI&DS)">B.tech(AI&DS)</option>
                                <option value="B.tech(AI&ML)">B.tech(AI&ML)</option>
                                <option value="B.tech(CSE)">B.tech(CSE)</option>
                                <option value="B.com">B.com</option>
                              </select>
                            </div>
                          </div>
                          </div>
                          
                          
                        </div>
      
                        <div className='row'>                         
                          
                    <div className='d-flex flex-row align-items-center mb-3 '>
                      <i class="fa-solid fa-home   fa-lg me-3 mt-3 fa-fw"></i>
                        <div className="form-group flex-fill mb-0">
                            <label className='m-1 mt-3'>Address</label>
                            <textarea value={address} className="form-control" placeholder="Address" onChange={(e)=>setAddress(e.target.value)}></textarea> 
                            <small className="form-text text-muted">(Not more than 10 words)</small>
                        </div>
                    </div>
                </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            
                          >
                            Submit
                          </button>
                        </div>
                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Updatestudent