import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about">
      <div className="arrow-left" onClick={() => navigate(-1)}>
        <FaArrowCircleLeft />
      </div>
      <div className="about-card text-center mt-5">
        <h5  style={{color:"black"}}><b>Who We Are ?</b></h5>

        <p style={{fontSize:"1rem"}}>
          At Skin Saviour, we believe in the power of nature to nurture your
          skin. Our mission is simple: to provide you with high-quality,
          handmade skincare products that are not only effective but also safe
          for you and the environment.
        </p>
      </div>
      <div className="about-card text-center mt-5">
        <h3>Why Choose Skin Saviour?</h3>

        <p style={{fontSize:"1rem"}}>
          <strong>Toxin-Free: </strong>Our products are carefully crafted
          without harmful chemicals, ensuring that your skin receives only the
          best and most natural ingredients.
        </p>

        <p style={{fontSize:"1rem"}}>
          <strong>Vegan: </strong> We are committed to creating products that
          are 100% plant-based, offering you the benefits of nature,without compromising your values.
        </p>

        <p style={{fontSize:"1rem"}}>
          <strong>Cruelty-Free: </strong> We love animals, and we believe that
          beauty should never come at the expense of our furry friends. Our
          products are proudly cruelty-free, with no animal testing involved.
        </p>

        <p  style={{fontSize:"1rem"}}>
          At Skin Saviour, we combine traditional wisdom with modern science to
          create skincare solutions that nourish, protect, and enhance your
          natural beauty. Each product is made with love and care, using only
          the finest ingredients sourced sustainably and ethically.
        </p>

        <p  style={{fontSize:"1rem"}}>
          Join us on our journey to make the world a kinder, more beautiful
          place—one skincare product at a time.
        </p>

        <p style={{fontSize:"1rem"}}>
          <strong>
            Your skin deserves the best. Your conscience does too.
          </strong>
        </p>
      </div>
      <div className="about-card-h1 text-center mt-5">
        <h1  style={{fontSize:"1rem"}}>100% Natural</h1>
        <h1  style={{fontSize:"1rem"}}>0% Chemicals</h1>
        <h1  style={{fontSize:"1rem"}}>Homemade</h1>
        <h1  style={{fontSize:"1rem"}}>Handmade</h1>
      </div>
    </div>
  );
}

export default About;
