import React, { useState } from 'react';
import './style1.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import Swal from 'sweetalert2';
import Navbar from './Navbar';

const ExtraDetails= () => {
    const [fname,setFname] = useState('')
    const [lname,setLname ] =useState('')
    const [mnumber,setMnumber]=useState('')
    const [showErrNum,setShowErrNum] = useState(false)
    const [dob,setDob]=useState('')
    const [email,setEmail]=useState('')
    const [gender,setGender]=useState('')
    const [address,setAddress]=useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [pincode,setPincode]=useState('')
    const [showErrPin,setShowErrPin] = useState(false)
    const [showErrEmail,setShowErrEmail] = useState(false)

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
        if (num.length < 6){
                setPincode(num)
            setShowErrPin(true)
        } else if (num.length == 6){
            setShowErrPin(false)
            setPincode(num)
        }
    }
    const handleNameChange = (e) =>{
        const name = e.target.value
        const valid = /^[a-zA-Z ]{1,30}$/.test(name)
        if(valid){
            setFname(e.target.value)            
        } else {
            
        }
        console.log(valid)
    }

    const handleDobChange = (e) =>{
        const dob = e.target.value
        const valid = /^(19\d{2}|20[0-2]\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(dob)
        if(valid){
            setDob(e.target.value)            
        } else {
            
        }
        console.log(valid)
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(fname,lname,mnumber,dob,email,gender,city,pincode,state)
    }
     return (
        <div>
        <Navbar/>
        <div className="container1 student-portal m-3 mx-auto p-5 rounded mt-5 w-75">
            
            <h1>  Extra Details</h1>
            <form onSubmit={handleSubmit} id="form1">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>First Name</label>
                            <input type="text" value={fname} className="form-control" placeholder="First Name" onChange={handleNameChange}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Last Name</label>
                            <input type="text" value={lname} className="form-control" placeholder="Last Name" onChange={(e)=>setLname(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div class="menu mt-4" >
        
        

    </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Mobile Number</label>
                            <input type="text" value={mnumber} className="form-control" placeholder="Mobile no." onChange={handleNumChange}  />
                            {showErrNum && <small className="form-text text-danger">It should contain numbers only</small> }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2' >Date Of Birth</label>
                            <input type="date"value={dob} className="form-control" placeholder="dob" onChange={handleDobChange}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2 mb-1'>Email address</label>
                            <input type="email" value={email} className="form-control" placeholder="Email ID" onChange={handleEmailChange} />
                            {showErrEmail && <small className="form-text text-danger">write a valid email</small> }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Gender</label>
                            <div className='row m-1' onChange={(e)=>setGender(e.target.value)}>
                                    <div className='col-4' >
                                    <input type="radio"  className="form-check-input" value="Male" name="Gender" />
                                    <label className="form-check-label">Male</label>
                                    </div>
                                    <div className='col-4'>
                                        <input type="radio" className="form-check-input" value="Female" name="Gender" />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                    <div className='col-4'>
                                        <input type="radio" className="form-check-input" value="Other" name="Gender" />
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
                            <select class="form-select" aria-label="Default select example">
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
                            <input type="text" value={city} className="form-control" placeholder="City" onChange={(e)=>setCity(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className='m-1 mt-2'>Pin Code</label>
                            <input type="number" value={pincode} className="form-control" placeholder="Pin Code" onChange={handlePinChange}/>
                            {showErrPin && <small className="form-text text-danger">Number should be not more than 6 digits</small> }
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className='m-1 mt-2'>State</label>
                    <input type="text" value={state} className="form-control" placeholder="State" onChange={(e)=>setState(e.target.value)}/>
                    <small className="form-text text-muted">(No abbreviation)</small>
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
