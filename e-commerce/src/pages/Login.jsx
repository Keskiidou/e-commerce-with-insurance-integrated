import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import { Footer, Navbar } from '../components';
import axios from 'axios';
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
import hellologo from '../img/warden3rdlogo.png';

const NewLoginPage = () => {
  const location = useLocation();
  const { alert } = location.state || {};
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (alert) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:7000/login', { email, password })
      .then((result) => {
        console.log('Result from server:', result.data);
        const { userId } = result.data;
        if (userId) {
          localStorage.setItem('userId', userId);
          localStorage.setItem('email', email);
          navigate('/', {
            state: { alert: { message: 'Login successful', severity: 'success' } },
          });
        }
      })
      .catch((err) => console.error('Error during login:', err.response.data));
  };

  return (
    <>
      <Navbar />
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="10" lg="6" className="order-2 order-lg-1 d-flex flex-column align-items-center">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                {showAlert && alert && (
                  <Alert severity={alert.severity} sx={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                    {alert.message}
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      label="Your Email"
                      id="form2"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      label="Password"
                      id="form3"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-outline-dark m-2" type="submit">Login</button>

                </form>
                <div className="my-3">
                  <p>
                    New Here?{' '}
                    <Link to="/register" className="text-decoration-underline text-info">
                      Register
                    </Link>{' '}
                  </p>
                  <p>
                    Forgot your password?{' '}
                    <Link to="/forgotpassword" className="text-decoration-underline text-info">
                      Forgot Password?
                    </Link>{' '}
                  </p>
                </div>
              </MDBCol>
              <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
                <MDBCardImage src={hellologo} fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default NewLoginPage;
