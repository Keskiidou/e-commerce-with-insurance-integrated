import React, { useState,useEffect } from 'react';
import { Footer, Navbar } from '../components';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';

const Register = () => {
  const location = useLocation();
  const { alert } = location.state || {};
  const [showAlert, setShowAlert] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/register', { name, email, password, repeatPassword })
      .then((result) => {
        console.log(result.data);
        if (result.data === "signup successful") {
          navigate('/login', { state: { alert: { message: 'sing up successful verify email', severity: 'success' } } });

        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error);
        } else {
          console.error(err);
          alert('An error occurred. Please try again later.');
        }
      });
  };
  useEffect(() => {
    if (alert) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  return (
    <>
      <Navbar />
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="10" lg="6" className="order-2 order-lg-1 d-flex flex-column align-items-center">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Warden</p>
                {showAlert && alert && (
                  <Alert severity={alert.severity} sx={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                    {alert.message}
                  </Alert>)}
                <form onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput label="Your Name" id="form1" type="text" className="w-100" onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput label="Your Email" id="form2" type="email" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput label="Password" id="form3" type="password" onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size="lg" />
                    <MDBInput label="Repeat your password" id="form4" type="password" onChange={(e) => setRepeatPassword(e.target.value)} />
                  </div>
                  <button className="btn btn-outline-dark m-2" type="submit">Register</button>

                </form>
                <div className="my-3">
                  <p>
                    Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link>{' '}
                  </p>
                </div>
              </MDBCol>
              <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
                <MDBCardImage src="https://static1.srcdn.com/wordpress/wp-content/uploads/2019/09/League-Legends-8-Million-Concurrent-Players.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5" fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default Register;
