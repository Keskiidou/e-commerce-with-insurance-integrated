import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import verify from "../img/verify.png";

const Confirm = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center"></h1>
        <div className="text-center">
          <img src={verify} alt="confirmed" style={{ height: '50px', width: '50px', color: '#4169E1' }} />
        </div>
        <hr />
        <div className="row my-4 h-100 text-center">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            Thank you for your purchase
          </div>
        </div>
        <div className="text-center">
          <Link to="/Product" className="btn btn-dark btn-lg" style={{ width: "50%" }}>Continue Shopping</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Confirm;
