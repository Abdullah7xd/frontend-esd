import axios from 'axios'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import './style1.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { isInteger } from 'formik'
const Createstudent = () => {
    const [sname, setSname] = useState("")
    const [showErrNum,setShowErrNum] = useState(false)
    const [mNumber, setMnumber] = useState("")
    const [age, setAge] = useState("")
    const [showErrAge,setShowErrAge]= useState(false)
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [address, setAddress] = useState("")
    const [showErrAdress,setShowErrAdd] = useState(false)
    const navigate = useNavigate();

    const handleSnameChange = (e) =>{
      const sname = e.target.value
      const valid = /^[a-zA-Z ]{1,30}$/.test(sname)
      if(valid){
          setSname(e.target.value)            
      } else {
          
      }
      console.log(valid)
  }
  const handleNumChange = (e)=>{
    const num = e.target.value
    if (num.length > 10){
        setShowErrNum(true)
    } else {
        setShowErrNum(false)
        setMnumber(num)
    }
    
}
const handleAgeChange = (e) =>{
  const age = e.target.value
  // const isnum = /[^0-9]/.test(age)
  const valid = age <=60 && age >=0
  if(valid){
      console.log(age)
      setShowErrAge(false)
      setAge(e.target.value)            
  } else {
    setShowErrAge(true)  
  }
  // console.log(valid)
}
    
    
    const handleSubmit = (e)=> {
      e.preventDefault();
      console.log("clicked");

      axios.post(
        " https://fiery-advice-production.up.railway.app/student",{
        studentName:sname,
        phoneNumber:mNumber,
        age:age,
        dateOfBirth:dateOfBirth,
        address:address
      }).then(res=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Student Created.',
        });
        navigate('/students');
      }).catch(e=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in creating student',
        });
      })
      
    };
  return (
    <div>
      <Navbar />
      <section className='' style={{ backgroundColor: "#eee" }} >
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black p-0 m-5" style={{ borderRadius: 25 }}>
                <div className="card-body ">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Create Student
                      </p>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-6">
                        <Link to='/readstudent'>
                        <button
                            type="button"
                            className="btn btn-primary mx-auto"
                          >
                            View Student List
                          </button>
                        </Link>
                          
                        </div>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit}
                      >
                       <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 mt-5 fa-fw"></i>
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label mb-0"
                              htmlFor="form3Example3c"
                            >
                              Student Name
                            </label>
                            <input required
                              type="text"
                               name="sname"
                              value={sname} 
                            onChange={handleSnameChange}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-phone fa-lg me-3 mt-3 fa-fw"></i>
                          <div className=" flex-fill mb-0">
                          <label 
                              className="form-label mb-0"
                              htmlFor="form3Example4c"
                            >
                              Phone Number
                            </label>
                            <input
                              type="number" required
                               value={mNumber}
                              className="form-control" onChange={handleNumChange}  />
                              {showErrNum && <small className="form-text text-danger">Number should be not more than 10 digits</small> }
                            </div>
                        </div>

                         
                        <div className="d-flex flex-row align-items-center mb-4">
                        {/* <i className="fas fa-calander-days "></i> */}
                        <i class="fa-solid fa-calendar-days fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <div className='row'>
                              <div className='col-6'>
                              <label 
                              className="form-label mb-0"
                              htmlFor="form3Example4c"
                            >
                              Age
                            </label>
                            <input
                              type="number" required
                              value={age}
                              className="form-control"
                              onChange={handleAgeChange}/>
                              {showErrAge && <small className="form-text text-danger">Age should be between 1-60</small> }
                            
                              </div>
                              <div className='col-6'>
                                <label 
                                className="form-label mb-0"
                                htmlFor="form3Example4c"
                                >
                                  D.O.B
                                </label>
                                <input
                                  type="date" required
                                  className="form-control"
                                  onChange={(e)=>setDateOfBirth(e.target.value)}
                              />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-home fa-lg me-3 fa-fw"></i>
                          <div className=" flex-fill mb-0">
                          <label className='form-label'>Address</label>
                    <textarea value={address} className="form-label w-100" placeholder="Address" onChange={(e)=>setAddress(e.target.value)}></textarea> 
                    {showErrAdress && <small className="form-text text-danger">(Enter Valid address)</small>}
                          </div>
                        </div>

                             
                       
                        <div className="d-flex justify-content-center mx-auto mb-3 mb-lg-4">
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

export default Createstudent