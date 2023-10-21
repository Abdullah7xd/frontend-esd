import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style1.css';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Popup from './Popup';
// import { FaEdit, FaTrash } from 'react-icons/fa';  

const Students = () => {
  const [data, setData] = useState([])
  function getData() {
    axios.get('https://fiery-advice-production.up.railway.app/course')
      .then((res) => {
        console.log(res.data);
        const tdata = res.data.filter(course=> course.status === 1)
        setData(tdata);
      })
   }

  function handleDelete(courseId) {
    console.log(courseId);
    axios.delete(`https://fiery-advice-production.up.railway.app/course/${courseId}`
    ).then(() => {
      getData()
    })
      .then((res) => {
        console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Course deleted !!',
          });
      }).catch(e=>{
        console.log(e)        
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: e.message,
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
          <div className="read-student-heading">

            <div className="row">
              <div className='col d-flex flex-row text-center align-items-center justify-content-center'>
                <h2>Courses</h2>
                <Popup getData={getData} />
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th className="th" title="Engineering Department">Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(course => (

                <tr key={course.courseId}>
                  <td>{course.courseId}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseDescription}</td>
                  <td>
                    

                    <button className='btn btn-warning' title="Click here to delete the course" onClick={() => handleDelete(course.courseId)}>
                    <i class="fa-solid fa-trash"></i>
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Students