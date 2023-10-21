import React, { useState } from 'react';
import './style1.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

const ExtraDetails= () => {

    const location = useLocation()
    console.log(location.state)
    const [id,setId] = useState(location.state.studentId)
    const [name,setName] =useState(location.state.studentName)
    const [mnumber,setMnumber]=useState(location.state.phoneNumber)
    const [showErrNum,setShowErrNum] = useState(false)
    const [dob,setDob]=useState(location.state.dateOfBirth)
    const [email,setEmail]=useState(location.state.email)
    const [gender,setGender]=useState('')
    const [address,setAddress]=useState(location.state.address)
    const [city,setCity]=useState(location.state.city)

    const [state,setState]=useState(location.state.state)
    const [showErrState,setShowErrState] = useState(false)

    const [pincode,setPincode]=useState(location.state.pinCode)
    const [showErrPin,setShowErrPin] = useState(false)
    const [showErrEmail,setShowErrEmail] = useState(false)
    const [showErrCity,setShowErrCity] = useState(false)
    const [showErrDob,setShowErrDob] = useState(false)
    const [showErrfname,setshowErrFname] = useState(false)
    const [showErrLname,setshowErrLname] = useState(false)
    const [course,setCourse]=useState('')

    const navigate = useNavigate()

    const handleEmailChange = (e) =>{
        const temail = e.target.value
        const valid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(temail)
        
        if(valid){
        
            setShowErrEmail(false)            
            setEmail(temail)            
        } else {
            setShowErrEmail(true)
            setEmail(temail)
            
        }
        if (temail.length === 0)
        {
            setShowErrEmail(false)
        }
        console.log(valid)
    }

    const handleNumChange = (e)=>{
        const num = e.target.value
        const numisValid = /^[1-9][0-9]{9}$/.test(num)
        const onlyNumber = /^[0-9]*$/.test(num)
        console.log(numisValid)
        if (!numisValid && !onlyNumber){
            setShowErrNum(true)
        } else if(onlyNumber && num.length <=10 && num[0] !== '0' ){
            setShowErrNum(false)
            setMnumber(num)
        }
        
    }
    const handlePinChange = (e)=>{
        const num = e.target.value
        const isValid = /^[0-9]{0,6}$/.test(num)
        if (num.length < 6 && isValid){
                setPincode(num)
            setShowErrPin(true)
        } else if (num.length == 6){
            setShowErrPin(false)
            setPincode(num)
        }
        if (num.length === 0)
        {
            setShowErrPin(false)
        }
    }
    const handleNameChange = (e) =>{
        const name = e.target.value
        const valid = /^[a-zA-Z ]{0,30}$/.test(name)
        if(valid){
            setshowErrFname(false)
            setName(name)            
        } else {
            setshowErrFname(true)
            
        }
        console.log(valid)
    }
    // const handleLnameChange = (e) =>{
    //     const lname = e.target.value
    //     const valid = /^[a-zA-Z ]{0,30}$/.test(lname)
    //     if(valid){
    //         setshowErrLname(false)
    //         setLname(lname)            
    //     } else {
    //         setshowErrLname(true)
    //     }
    //     console.log(valid)
    // }
    const handleCityChange = (e) =>{
        const city = e.target.value
        const valid = /^[a-zA-Z ]{0,30}$/.test(city)
        if(valid){
            setCity(city)            
        } else {
            
        }
        console.log(valid)
    }
    const handleStateChange = (e) =>{
        const state = e.target.value
        const valid = /^[a-zA-Z ]{0,100}$/.test(state)
        if(valid){
            setShowErrState(false)
            setState(state)            
        } else {
            setShowErrState(true)
        }
        console.log(valid)
    }
    function calculateAge(dob) {
        const dobDate = new Date(dob);
        const currentDate = new Date();
        
        const age = currentDate.getFullYear() - dobDate.getFullYear();
        
        // Check if the birthdate has occurred this year, but not yet this month and day
        if (
          currentDate.getMonth() < dobDate.getMonth() ||
          (currentDate.getMonth() === dobDate.getMonth() &&
            currentDate.getDate() < dobDate.getDate())
        ) {
          age--;
        }
        
        return age;
      }
    const handleDobChange = (e) =>{
        let dob = e.target.value
        console.log(dob)      
        console.log(calculateAge(dob))
        const tage = calculateAge(dob)
        if(tage <2 || tage > 120)
        {
            setShowErrDob(true)
        }
        else{
            setShowErrDob(false)
            setDob(dob)
        }
    }
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log("clicked");
        const data = {
          studentName:name,
          phoneNumber:mnumber,
          age:calculateAge(dob),
          email:email,
          city:city,
          state:state,
          pinCode:pincode,
          dateOfBirth:dob,
          address:address,
          course:course
        }
      console.log(data);
      
        axios.put(
          `http://localhost:8080/student/${id}`,data).then(res=>{
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Student Updated',
          });
          navigate('/students');
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
        <Navbar/>
        <div className="container1 student-portal m-3 mx-auto p-5 rounded mt-5 w-75">
            
            <h1>  Edit Details</h1>
            <form onSubmit={handleSubmit} id="form1">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Name</label>
                            <input required type="text" value={name} className="form-control" placeholder="First Name" onChange={handleNameChange}/>
                            {showErrfname && <small className="form-text text-danger">write a valid first name</small> }
                        </div>
                    </div>
                    
                </div>
                <div class="menu mt-4" >
        
        

    </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Mobile Number</label>
                            <input required type="text" value={mnumber} className="form-control" placeholder="Mobile no." onChange={handleNumChange}  />
                            {showErrNum && <small className="form-text text-danger">It should contain numbers only</small> }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2' >Date Of Birth</label>
                            <input required type="date"value={dob} className="form-control" placeholder="dob" onChange={handleDobChange}/>
                            {showErrDob && <small className="form-text text-danger">Enter valid dob for a student </small> }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2 mb-1'>Email address</label>
                            <input required type="email" value={email} className="form-control" placeholder="Email ID" onChange={handleEmailChange} />
                            {showErrEmail && <small className="form-text text-danger">write a valid email</small> }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Gender</label>
                            <div className='row m-1' onChange={(e)=>setGender(e.target.value)}>
                                    <div className='col-4' >
                                    <input required type="radio"  className="form-check-input" value="Male" name="Gender" />
                                    <label className="form-check-label">Male</label>
                                    </div>
                                    <div className='col-4'>
                                        <input required type="radio" className="form-check-input" value="Female" name="Gender" />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                    <div className='col-4'>
                                        <input required type="radio" className="form-check-input" value="Other" name="Gender" />
                                        <label className="form-check-label">Other</label>
                                    </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col col-lg-6 col-12'>
                        <div className="form-group">
                            <label className='m-1 mt-3'>Address</label>
                            <textarea value={address} className="form-control" placeholder="Address" onChange={(e)=>setAddress(e.target.value)}></textarea> 
                            <small className="form-text text-muted">(Not more than 10 words)</small>
                        </div>
                    </div>
                    <div className='col col-lg-6 col-12'>
                        <div className="form-group">
                            <label className='form-label'>Course</label>
                            <select required class="form-select" aria-label="Default select example" onChange={(e)=>setCourse(e.target.value)}>
                                <option selected disabled>Select Course</option>
                                <option value="B.tech(AI&DS)">B.tech(AI&DS)</option>
                                <option value="B.tech(AI&ML)">B.tech(AI&ML)</option>
                                <option value="B.tech(CSE)">B.tech(CSE)</option>
                                <option value="B.com">B.com</option>                                
                            </select>
                        </div>
                    </div>
                </div>

                
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>City</label>
                            <input required type="text" value={city} className="form-control" placeholder="City" onChange={handleCityChange} />
                            {showErrCity && <small className="form-text text-danger">write a valid city</small> }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Pin Code</label>
                            <input required type="text" value={pincode} className="form-control" placeholder="Pin Code" onChange={handlePinChange}/>
                            {showErrPin && <small className="form-text text-danger">Number should be not more than 6 digits</small> }
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className='m-1 mt-2'>State</label>
                    <input required type="text" value={state} className="form-control" placeholder="State" onChange={handleStateChange}/>
                    {showErrState && <small className="form-text text-danger">write a valid state</small> }
                </div>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <button type="submit" className="btn btn-success m-4" form="form1">Submit</button>
                    </div>
                </div>
            </form>
            

        </div>
        </div>
    )
}

export default ExtraDetails;
