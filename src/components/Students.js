import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style1.css';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
// import { FaEdit, FaTrash } from 'react-icons/fa';  

const Students = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function getData() {
    axios.get('https://fiery-advice-production.up.railway.app/student')
      .then((res) => {
        const tdata = res.data.filter(stu => stu.status === 1);
        setData(tdata);
      });
  }

  function handleDelete(studentId) {
    axios.delete(`https://fiery-advice-production.up.railway.app/student/${studentId}`)
      .then(() => {
        getData();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User deleted !!',
        });
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    const results = data.filter((student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  return (
    <div>
      <Navbar />
      
      <div className='row'>
        <div className='col col-9 mx-auto mt-5'>
          <h2 className="read-student-heading">Registered Students</h2>
          <div className='search-bar mb-3'>
            <div className="search-input">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={handleSearch}
                style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
                spellCheck="false"
              />
            </div>
          </div>

          <div className='table-responsive'>
            <table className="table datatable" id='excel-table'>
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
                {searchResults.length > 0 ? (
                  searchResults.map((student) => (
                    <tr key={student.studentId}>
                      <td>{student.studentId}</td>
                      <td>
                        <Link to="/profile" state={student}>
                          {student.studentName}
                        </Link>
                      </td>
                      <td>{student.phoneNumber}</td>
                      <td>{student.age}</td>
                      <td>{student.dateOfBirth}</td>
                      <td>{student.address}</td>
                      <td>{student.course}</td>
                      <td>
                        <Link to="/updatestudent" state={student}>
                          <button className="btn btn-info mb-1 w-100">
                            <i className="fa-regular fa-pen-to-square"></i>
                          </button>
                        </Link>
                        <button
                          className="btn btn-warning w-100"
                          onClick={() => handleDelete(student.studentId)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="not-found-message">
                        Name does not exist.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
