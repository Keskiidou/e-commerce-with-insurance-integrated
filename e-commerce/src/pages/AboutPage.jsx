import React from 'react';
import { Categories, Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h2 className="text-center" style={{ fontSize: "3.6rem", color: "#4169E1", fontFamily: 'Abril Fatface' }}>
          About Our shop
        </h2>
        <hr />
        <p className="lead text-center">
          At Our Shop, we take pride in offering a wide range of products across three main categories: phones, computers,
           and household appliances. Our phone selection includes the latest models from top brands, catering to all preferences and budgets.
            For those in need of computing solutions, our computer category features powerful laptops, versatile desktops, and accessories 
            to enhance your digital experience. Additionally, our household appliances section offers a variety of essential items to simplify
             daily tasks and enhance your living space. Whether you're in the market for a new smartphone, a high-performance laptop, or home
              appliances to streamline your routines, Our Shop has you covered with quality products and competitive prices.

        </p>
        <Categories />
      </div>
      <Footer />
    </>
  )
}

export default AboutPage;
