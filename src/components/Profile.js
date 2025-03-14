import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { FaArrowCircleLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();
  const { backendUrl, token, setToken, setCartItems } = useContext(ShopContext);

   // Logout Handler
   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); // Remove user's name
    setToken("");

    // Clear cart from backend
    axios
      .post(backendUrl + "/api/cart/logout", { userId: token })
      .then(() => {
        setCartItems({});
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to logout");
      });
    navigate("/login");
  };


  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
      setFirstLetter(storedName.slice(0, 1).toUpperCase());
    }
  }, []);

  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        const response = await axios.post(
          backendUrl + "/api/order/latest-order",
          {}, // Empty body
          { headers: { Authorization: `Bearer ${token}` } }
        );
      

        if (response.data.success) {
          setShippingAddress(response.data.shippingAddress);
        }
      } catch (error) {
        console.error("Error fetching shipping address:", error);
      }
    };

    fetchShippingAddress();
  }, []);

  return (
    <div className="profile-bg opacity-bg">
        <div className="arrow-left" onClick={() => navigate(-1)}>
        <FaArrowCircleLeft/>
        </div>
        <div>
        {token ? (
            <>
              <button className="logout-button" onClick={handleLogout}>Logout</button>{" "}
            </>
          ) : (
            <button className="login-button" onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      {/* Top Bar */}
      {/* <div className="topbar">
        <p className=" fw-bold fs-5 mb-2 ">
          My Profile
        </p>
      </div> */}

      {/* Profile Section */}
      <div className="profile-header">
        <div className="profile-card text-center mt-5">
          {/* <div className="user-avatar">{firstLetter}</div> */}
          <div className="avatar-img">
                <img src="/assets/images/Homemade.jpeg" alt="" />
          </div>

          <div
            className="mt-4 m-3"
            style={{ color: "black", fontWeight: "bold" }}
          >
            {userName ? (
              <span>
                <b className="fs-4" style={{color:"gold"}}>Hello, {userName}! </b><br />
                <b className="fs-5" style={{color:"gray"}}>Welcome to Skin Saviour{" "}</b>
              </span>
            ) : (
              <span><b className="fs-5" style={{color:"gray"}}>Welcome to Skin Saviour!{" "}</b></span>
            )}
          </div>
          <div className="d-flex justify-content-center gap-3">
            <Button
              onClick={() => navigate("/orders")}
              className="fw-bold px-4 profile-order"
              style={{ border: "none", outline: "none", boxShadow: "none" }}
            >
              My Orders
            </Button>
            
          </div>
          <div className="mt-4 mb-4 shipping-address-container">
          {shippingAddress ? (
            <div>
              <b>Shipping Address:</b> <br />
              {shippingAddress.firstName} {shippingAddress.lastName} <br />
              {shippingAddress.address}, {shippingAddress.city},{" "}<br />
              {shippingAddress.state},{" "}
              {shippingAddress.zipCode}, {shippingAddress.country} <br />
              Phone: {shippingAddress.phoneNumber}
            </div>
          ) : (
            <span>
              <b>Shipping Address Not Available</b>
            </span>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
