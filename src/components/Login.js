import { useState ,useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




function Login () {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const [formData,setFormData] = useState(
        {
          username: '',
          password: ''
        }
    );
  

   const handleChange = (e) => {
     const {name, value} = e.target;
     setFormData( 
        {
           ...formData,
            [name]: value

        });
    };

useEffect(() => {
    fetch('fiery-advice-production.up.railway.app/user/login?'+'username='+formData.username+'&password='+formData.password)
    .then((response)=> response.json())
    .then((data)=>{ 
      console.log(data + 'abcd');     
        setData(data);
        setLoading(false);       
    })
    .catch((error)=>console.error('Problem fetching',error));
    } ,[]);

    // if(loading) {
    //     return <div> Loading ........</div>;
    // }


    const navigate = useNavigate();
    const handleSubmit = (e) => {
  e.preventDefault();

  // Extract email and password from the formData state
  const { username, password } = formData;

  if (!username || !password) {
    // Display an error message if email or password is not provided
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please enter your name and password.',
    });
    return; // Exit early if email or password is not provided
  }

  // Check if the user has agreed to the terms
  // const termsAgreed = document.getElementById('form2Example3c').checked;
  // if (!termsAgreed) {
  //   // Display an error message if terms are not agreed
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Error',
  //     text: 'Please agree to the terms of service.',
  //   });
  //   return; // Exit early if terms are not agreed
  // }

  // Assume you have some logic to handle login and get the response.
  // For demonstration purposes, let's simulate a successful login with status 200.
  const res = { status: 200 };

  if (res.status === 200) {
    // Display a success message if login is successful
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'User Logged In Successfully!!',
    });

    // Navigate to the desired location after successful login.
    navigate('/home');
  } else {
    // Display an error message if login fails
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Login Failed. Please check your credentials.',
    });
  }
};

      return(
      <div>
      <section className="vh-100" style={{ backgroundColor: "#eee", height: '100vh' }}>
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Log in
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                        <i class="fa-solid fa-user fa-lg me-3 fa-fw mt-5"></i>
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                              >
                              Name
                            </label>
                            <input
                              placeholder="Enter your name"
                              type="text"
                              name="username"
                              value={formData.username} 
                              onChange={handleChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw mt-5" />
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              placeholder="Enter your password"
                              onChange={handleChange}
                              value={formData.password}
                              className="form-control"
                            />
                          </div>
                        </div>
      
                        {/* <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            defaultValue=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div> */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                      <p className="text-center text-muted mt-5 mb-0">
                        Not Registered Yet?{" "}
                        <Link to="/signup" className="fw-bold text-body">
                          <u>Register here</u>
                        </Link>
                      </p>
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
    );

}
export default Login;
