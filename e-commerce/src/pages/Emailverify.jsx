import React, { useState, useEffect } from 'react';
import { useLocation,Link} from 'react-router-dom';
import axios from 'axios';
import { Navbar } from "../components";

const EmailVerification = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.patch(`http://localhost:7000/email_verify/${token}`);
        setVerificationMessage(response.data.message);
      } catch (error) {
        console.error(error);
        setVerificationMessage('An error occurred during email verification.');
      }
    };

    verifyEmail();
  }, [token]);
return (
  <>
    <Navbar />
    <div className="container my-3 py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">{verificationMessage}</h4>
            <Link to="/login" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Go Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default EmailVerification;

