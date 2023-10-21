import React from 'react';
import icon5 from './images/icon5.png';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const teamData = [
    {
      title: 'Frontend Team',
      members: ['Shubh Prakash Shukla', 'Abdullah Afzal'],
    },
    {
      title: 'Backend Team',
      members: ['Shivam Tiwari', 'Daisy Khan'],
    },
    {
      title: 'Testing Team',
      members: ['Vaishnavi Mishra', 'Shoaib Khan'],
    },
    {
      title: 'Database Administrator',
      members: ['Aniket Kumar', 'Avneesh Yadav'],
    },
  ];

  return (
    <div>
      <Navbar />
      <>
        <div className="about-section">
          <h1>About ESD</h1>
          <p>Welcome To Employable Skill Development Program</p>
        </div>
        <h2 style={{ textAlign: "center" }}>Our Team</h2>
        <div className="container mb-5">
          <div className="row">
            {teamData.map((team, index) => (
              <div className="col-md-6 my-3" key={index}>
                <div className="card border-info">
                  <div className="card-body text-info">
                    <h5 className="card-title">{team.title}</h5>
                    <p className="card-text">
                      <ul className='list-unstyled'>
                        {team.members.map((member, i) => (
                          <li key={i}>{member}</li>
                        ))}
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>

      <footer className="text-center text-lg-start bg-dark text-muted">
        <div className="text-center text-white p-4 bg-dark">
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="#">
            ESD
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
