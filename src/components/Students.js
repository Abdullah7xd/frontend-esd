import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style1.css';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
// import { FaEdit, FaTrash } from 'react-icons/fa';  

const Students = () => {
  const [data, setData] = useState([])
  function getData() {
    axios.get(' https://fiery-advice-production.up.railway.app/student')
      .then((res) => {
        console.log(res.data);
        const tdata = res.data.filter(stu=> stu.status === 1)
        setData(tdata);
      })
  }

  function handleDelete(studentId) {
    console.log(studentId);
    axios.delete(`https://fiery-advice-production.up.railway.app/student/${studentId}`
    ).then(() => {
      getData()
    })
      .then((res) => {
        console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User deleted !!',
          });
      })
  }



  useEffect(() => {
    getData();

  }, [])


  return (

    <div>
      <Navbar />
      <div className='row'>
        <div className='col col-9 mx-auto mt-5'>
          <h2 className="read-student-heading">Registered Students</h2>
          <div className='table-responsive'>
          <table className="table datatable" id='excel-table' >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>PhoneNumber</th>
                <th>Age</th>
                <th>DateOfBirth</th>
                <th>Address</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(student => (

                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.studentName}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.age}</td>
                  <td>{student.dateOfBirth}</td>
                  <td>{student.address}</td>
                  <td>{student.course}</td>
                  <td>
                    <Link to={"/updatestudent"} state={student}>
                      <button
                        className="btn btn-info mb-1 w-100"
                      >
                        Update
                      </button>
                    </Link>

                    <button className='btn btn-warning w-100' onClick={() => handleDelete(student.studentId)}>
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students