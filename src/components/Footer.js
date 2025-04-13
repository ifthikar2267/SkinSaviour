import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF , faInstagram , faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  let date = new Date()
  return (
    <footer class="footer">
    <div class="footer-container m-1">
      <div class="footer-section-img">
      <Link to="/"><img alt='Logo' src='/assets/images/LogoHead.jpg' style={{width:"70px",height:"70px"}}/></Link>
      </div>
      <div class="footer-section-quick-links">
        <h2 className="footer-h2">QUICK LINKS</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/product">Products</Link></li>
        </ul>
      </div>
      <div className="footer-section-getintouch">
        <h2 className="footer-h2 ">GET IN TOUCH</h2>
        <p style={{marginTop:"9px"}}>Skin Saviour</p>
        <p style={{marginTop:"-5px"}}>+91 8848451476</p>
        <p style={{marginTop:"-5px"}}>09 am - 06 pm</p>
        <p style={{marginTop:"-7px"}}>skinsaviour@gmail.com</p>
      </div>
      <div class="footer-section-followus">
        <h2 className="footer-h2 ">FOLLOW US</h2>
        <div class="social-icons ms-4">
          <Link to="https://www.facebook.com/profile.php?id=61564888602337&mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebookF} /></Link>
          <Link to="https://x.com/_Skin_Saviour?t=-g1zZMRrqeSed8ZPp7-DuQ&s=09">  <FontAwesomeIcon icon={faTwitter} /></Link>
          <Link to="https://www.instagram.com/_skin_saviour?igsh=MXh1aXI1cmw2cTV5cQ=="> <FontAwesomeIcon icon={faInstagram} /></Link>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Copyright&copy; {date.getFullYear()} skinsaviour.com  <br/> All Right Reserved</p>
    </div>
  </footer>
  
  )

}
     
export default Footer;