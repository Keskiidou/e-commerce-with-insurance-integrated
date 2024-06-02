import React from 'react';
import { Categories, Footer, Navbar } from "../components";
import ins from '../img/insurancestuff.jpg';

const AboutINS = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h2 className="text-center" style={{ fontSize: "3.6rem", color: "#4169E1", fontFamily: 'Abril Fatface' }}>
          About Our Insurance
        </h2>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <p className="lead">
              At our insurance company, we prioritize providing comprehensive and reliable coverage tailored to meet your unique needs.
              We understand that navigating the complexities of insurance can be challenging, which is why our team is dedicated to making
              the process as straightforward and transparent as possible. Our policies are designed to offer maximum protection and peace of mind,
              covering everything from routine issues to unexpected emergencies. With a commitment to excellent customer service, we ensure that
              claims are handled efficiently and compassionately. Trust us to safeguard what matters most to you, with flexible options
              and personalized support every step of the way.
            </p>
          </div>
          <div className="col-md-6">
            <img src={ins} alt="Insurance Stuff" className="img-fluid" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutINS;
