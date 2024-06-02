import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Footer, Navbar, SelectAutoWidth } from "../components";
import axios from 'axios';

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSelectedValue = (value) => {
    setSelectedValue(value);
  };
  
  const isLoggedIn = () => {
    return !!localStorage.getItem('userId'); 
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn()) {
      
      const loggedInUserEmail = localStorage.getItem('email');

      
      if (email === loggedInUserEmail) {
        axios.post('http://localhost:7000/contact', { email , selectedValue , message}) 
          .then((result) => {
            console.log(result.data);
            setEmail("");
            setMessage("");
            setSelectedValue([]);
            setSuccessMessage("Message sent successfully!");
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
          })
          .catch((err) => {
            if (err.response && err.response.data && err.response.data.error) {
              alert(err.response.data.error);
            } else {
              console.error(err);
              alert('An error occurred. Please try again later.');
            }
          });
      } else {
        alert('Please enter your own email address.');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
      <h2 className="text-center" style={{ fontSize: "3.6rem", color: "#4169E1", fontFamily: 'Abril Fatface' }}>
              Contact Us!
            </h2>        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="Your Current Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form my-3">
                <SelectAutoWidth onSelect={handleSelectedValue} />
              </div>
              <div className="form my-3">
                <label htmlFor="Message">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="Message"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button className="my-2 px-4 mx-auto btn btn-dark" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
