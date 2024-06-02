import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from 'axios'; 


const FotgotPassword = () => {
 
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/Forgotpassword', { email })
          .then(result => {
            console.log('Result from server:', result.data); 
            setMessage(result.data); 
          })
          .catch(err => console.error('Error during login:', err.response.data));
      }
  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Reset your Password</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}> 
              <div className="my-3">
                <label htmlFor="display-4">Enter your Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>Login <Link to="/login" className="text-decoration-underline text-info">Go Back</Link> </p>
                
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  send
                </button>
              </div>
            </form>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
      <Footer />
    </>
  );
};
export default FotgotPassword;
