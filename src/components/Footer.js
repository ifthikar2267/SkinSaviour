import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF , faInstagram , faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
      <a href="/"><img alt='Logo' src='/assets/images/LogoHead.jpg' style={{width:"100px",height:"100px"}}/></a>
      </div>
      <div class="footer-section">
        <h2>Quick Links</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/product">Products</a></li>
          <li><a href="/category">Category</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h2>Contact Us</h2>
        <p>Skin Saviour</p>
        <p>+91 8848451476</p>
        <p>skinsaviour@gmail.com</p>
      </div>
      <div class="footer-section">
        <h2>Follow Us</h2>
        <div class="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61564888602337&mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://x.com/_Skin_Saviour?t=-g1zZMRrqeSed8ZPp7-DuQ&s=09">  <FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.instagram.com/_skin_saviour?igsh=MXh1aXI1cmw2cTV5cQ=="> <FontAwesomeIcon icon={faInstagram} /></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024-2030, Copyright &copy; Skin Saviour</p>
    </div>
  </footer>
  
  )

}
     
export default Footer;