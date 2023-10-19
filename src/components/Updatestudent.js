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
  const [phoneNumber, setPhoneNumber] = useState(location.state.phoneNumber);
  const [age, setAge] = useState(location.state.age);
  const [dateOfBirth, setDateOfBirth] = useState(location.state.dateOfBirth);
  const [address, setAddress] = useState(location.state.address);
  
  


  const navigate = useNavigate();




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
        email:"hello@gmail.com",
        city:"city",
        state:"UP",
        piCode:"123433",
        course:"hello"
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
        text: 'Error in updating',
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
                        <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
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
                              onChange={(e)=>setStudentName(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className=" flex-fill mb-0">
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
                              onChange={(e)=>setPhoneNumber(e.target.value)}
                            />
                          </div>
                          <div className=" flex-fill mb-0">
                            <label 
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Age
                            </label>
                            <input
                              type="number" required
                              value={age}
                              className="form-control"
                              onChange={(e)=>setAge(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-book-open fa-lg me-3 fa-fw" />
                          <div className=" flex-fill mb-0">
                            <label 
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              date Of Birth
                            </label>
                            <input
                              type="text" required
                              value={dateOfBirth}
                              className="form-control"
                              onChange={(e)=>setDateOfBirth(e.target.value)}
                            />
                          </div>
                          <div className=" flex-fill mb-0">
                            <label 
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Address
                            </label>
                            <input
                              type="text" required
                              value={address}
                              className="form-control"
                              onChange={(e)=>setAddress(e.target.value)}
                            />
                          </div>
                        </div>
      
                       
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            
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