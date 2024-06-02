import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import carousel1 from '../img/caroussel 1.png';
import carousel2 from '../img/caroussel2.jpg';
import carousel3 from '../img/caroussel3.jpg'

const CarouselFadeExample = () => {
  return (
    <div className="carousel-container">
      <style>
        {`
          .carousel-container {
            width: 100%;
            margin: 0 auto;
          }

          .carousel-image {
            height: 600px; /* Adjust height for better visual balance */
            object-fit: cover; 
          }

          .carousel-caption {
            background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background for captions */
            color: black; /* Set the caption text color to black */
          }

          .carousel-caption h3 {
            font-size: 2em; /* Increase font size for captions */
          }

          .carousel-caption p {
            font-size: 1.2em; /* Increase font size for caption descriptions */
          }
        `}
      </style>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image" 
            src= {carousel1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Protect your Products</h3>
            <p>Ensure the safety of your valuable items with our comprehensive insurance plans.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image" 
            src={carousel2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Easy Online Shopping</h3>
            <p>Shop hassle-free with our intuitive online platform and secure payment options.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image" 
            src={carousel3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Repair Services</h3>
            <p>Trust our expert technicians to restore your broken products to their former glory.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselFadeExample;
