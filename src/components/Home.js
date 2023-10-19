import React from 'react'
import icon5 from './images/icon5.png'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import './style1.css';

const Home = () => {
  return (

    <div>
      <Navbar />
      <>
        <div className="about-section">
          <h1>About ESD</h1>
          <p>Welcome To Employable Skill development Program </p>
        </div>
        <h2 style={{ textAlign: "center" }}>Our Team</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-6 my-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Frontend Team</h5>
                  <p className="card-text">
                    <div>1 Shubh Prakash Shukla<br />2 Abdullah Afzal</div>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Backend Team</h5>
                  <p className="card-text">
                    <div>1 Shivam Tiwari<br />2 Avneesh yadav</div>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Testing Team </h5>
                  <p className="card-text">
                    <div>1 Vaishnavi Mishra<br />2 </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="card h-100" style={{ minHeight: 206 }}>
                <div className="card-body">
                  <h5 className="card-title">Database Administrator</h5>
                  <p className="card-text">

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </>


      <footer className="text-center text-lg-start bg-dark text-muted">
        {/* Section: Links  */}

        {/* Section: Links  */}
        {/* Copyright */}
        <div className="text-center text-white p-4 bg-dark">
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="#">
            {" "}
            ESD
          </a>
        </div>
        {/* Copyright */}
      </footer>

    </div>
  )
}

export default Home