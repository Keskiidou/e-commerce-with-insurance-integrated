import React from 'react';
import { Categories, Footer, Navbar } from "../components";
import rpr from '../img/repairxd.jpg';

const AboutINS = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h2 className="text-center" style={{ fontSize: "3.6rem", color: "#4169E1", fontFamily: 'Abril Fatface' }}>
          About Our Repair Shop
        </h2>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <p className="lead">
              At our repair shop, we specialize in fixing all sorts of issues with vehicles. Whether it's a minor dent or a major collision,
              our skilled technicians are here to restore your vehicle to its former glory. With state-of-the-art equipment and years of experience,
              we guarantee quality workmanship and attention to detail in every repair job. We understand the importance of your vehicle in your daily
              life, which is why we strive to provide efficient service without compromising on quality. From bodywork to mechanical repairs,
              trust us to get your vehicle back on the road safely.
            </p>
            <p className="lead">
              Our repair shop is committed to customer satisfaction, and we go above and beyond to exceed your expectations. With competitive pricing,
              transparent communication, and friendly staff, we aim to make your repair experience as hassle-free as possible. Whether you're dealing
              with insurance claims or seeking regular maintenance, our team is here to assist you every step of the way.
            </p>
          </div>
          <div className="col-md-6">
            <img src={rpr} alt="Repair Stuff" className="img-fluid" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutINS;
