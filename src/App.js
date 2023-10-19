

import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Createstudent from './components/Createstudent';
import Updatestudent from './components/Updatestudent';
import Home1 from './components/Home1';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Students from './components/Students';
import ExtraDetails from './components/ExtraDetails';
import Profile from './components/Profile';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      {/* <Navbar1 /> */}
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/home1" element={<Home1 />}></Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createstudent" element={<Createstudent />} />
        <Route path="/students" element={<Students />} />
        <Route path="/updatestudent" element={<Updatestudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/ExtraDetails" element={<ExtraDetails/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/" element={<Navigate to="/login"/>} />

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
