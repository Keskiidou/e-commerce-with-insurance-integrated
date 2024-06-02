import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import axios from "axios";


const Resetyoupassword = () => {
  const [newPassword, setnnewPassword] = useState('');
  const [repeatnewPassword, setrepeatnewPassword] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('id');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:7000/Resetyoupassword/${userId}`, { newPassword, repeatnewPassword })
      .then(result => {
        console.log('Result from server:', result.data);
        setMessage(result.data);
        navigate('/login');
      })
      .catch(err => console.error('Error during login:', err.response.data));
  }
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <h1 className="text-center">Reset your Password</h1>
          <hr />
          <div className="row my-4 h-100">
            <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="my-3">
                  <label htmlFor="floatingPassword display-4">enter new password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    onChange={(e) => setnnewPassword(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="floatingPassword display-4">repeat new Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword2"
                    onChange={(e) => setrepeatnewPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button className="my-2 mx-auto btn btn-dark" type="submit">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Resetyoupassword;
