import React from 'react'
import icon5 from './images/icon5.png'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
//  

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
        <div className="container mb-5">
          <div className="row">
            <div className="col-md-6 my-3">
              <div className="card h-100">
                <div className="card-body justify-content-left">
                  <h5 className="card-title">Frontend Team</h5>
                  <p className="card-text">
                    <div>
                      <ul className='list-unstyled'>
                        <li>Shubh Prakash Shukla</li>
                        <li>Abdullah Afzal</li>
                      </ul>
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Backend Team</h5>
                  <p className="card-text">
                    <div>
                    <ul className='list-unstyled'>
                        <li>Shivam Tiwari</li>
                        <li>Daisy Khan</li>
                      </ul>
                      </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Testing Team </h5>
                  <p className="card-text">
                    <div>
                    <ul className='list-unstyled'>
                        <li>Vaishnavi Mishra</li>
                        <li>Shoaib Khan</li>
                      </ul>
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Database Administrator</h5>
                  <p className="card-text">
                  <div>
                    <ul className='list-unstyled'>
                        <li>Aniket Kumar</li>
                        <li>Avneesh Yadav</li>
                      </ul>
                    </div>

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