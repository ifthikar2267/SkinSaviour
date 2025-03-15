import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import ChatBot from "./ChatBot";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

/*
 <Navbar.Brand as={Link} to="/">
        <img
          alt="Logo"
          src="/assets/images/LogoNav.jpg"
          className="rounded-circle"
          width="50"
          height="50"
        />
      </Navbar.Brand>
*/

const Sidebar = () => {
  const { getTotalCartCount, backendUrl, token, setToken, setCartItems } =
    useContext(ShopContext);
  const cartCount = getTotalCartCount();
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstLetter, setFirstLetter] = useState("");
  const { setShowSearch } = useContext(ShopContext);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

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
    } else {
      setFirstLetter("");
    }
  }, []);

  /* fixed navbar screen scroll > 50 */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*prevent scroll when menubar open */
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  return (
    <>
      <div className="top-navbar d-flex align-items-center">
        <h4 className="head">
          Skinsaviour ChatBot -{" "}
          <span className="chatbot-inline">
            <ChatBot />
          </span>
        </h4>
      </div>
      <div className={`floating-navbar w-100 p-2 ${isSticky ? "sticky" : ""}`}>
        <Navbar
          expand="sm"
          className="w-100 py-3 px-4 d-flex align-items-center justify-content-between "
        >
          {/* Hamburger Icon on the Left */}
          <FontAwesomeIcon
            icon={visible ? faXmark : faBars} 
            className={`sidebar-fa-bar fs-1 cursor-pointer d-block d-sm-none me-3 ${
              visible ? "rotate-270" : "rotate-360"
            }`}
            style={{
              color: "#F6F6F6",
              fontWeight: "bold",
              borderRadius: "5px",
              transition: "transform 0.3s ease-in-out",
            }}
            onClick={() => setVisible(!visible)} 
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <NavLink to="/" className="nav-link">
                  HOME
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink to="/product" className="nav-link">
                  PRODUCT
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink to="/about" className="nav-link">
                  ABOUT
                </NavLink>
              </Nav.Item>

              <Nav.Item>
                <NavLink to="/contact" className="nav-link">
                  CONTACT
                </NavLink>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>

          <div className="d-flex align-items-center gap-3">
            {/* Search Icon */}
            <FontAwesomeIcon
              onClick={() => setShowSearch(true)}
              style={{ color: "#F6F6F6" }}
              icon={faSearch}
              className="fs-3 cursor-pointer"
            />

            {/* Cart Icon with Badge */}
            <div className="position-relative">
              <NavLink to="/cart" className="text-dark">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="fs-3 cursor-pointer"
                  style={{
                    color: "#F6F6F6",
                    fontWeight: "bold",
                    borderRadius: "3px",
                  }}
                />

                {cartCount > 0 && (
                  <Badge
                    pill
                    bg="light"
                    text="dark"
                    className="position-absolute top-0 start-100 translate-middle border border-dark"
                    style={{
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                    }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </NavLink>
            </div>

            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <div className="navbar-profile fs-5 ms-2">
                {firstLetter ? firstLetter : <FaUserAlt />}
              </div>
            </NavLink>
          </div>

          {/* Sidebar menu for small screen */}
          <div
            className={`position-absolute top-0 end-0 bottom-0 bg-white transition-all sidebar-menu sidebar-menu ${
              visible ? "open" : ""
            }`}
            style={{ zIndex: visible ? "9999" : "0" }}
          >
            {visible && (
              <div className="d-flex flex-column text-dark">
                {/* <div
                  onClick={() => setVisible(false)}
                  className="close-btn d-flex align-items-center gap-5 p-3 justify-content-end"
                >
                  <FontAwesomeIcon icon={faAngleRight} className="h-2" />
                </div> */}
                <div className="sidebar-menu-content">
                  <NavLink to="/" onClick={() => setVisible(false)}>
                    HOME
                  </NavLink>
                  <NavLink to="/product" onClick={() => setVisible(false)}>
                    PRODUCT
                  </NavLink>
                  <NavLink to="/about" onClick={() => setVisible(false)}>
                    ABOUT
                  </NavLink>
                  <NavLink to="/contact" onClick={() => setVisible(false)}>
                    CONTACT
                  </NavLink>
                </div>
                {/* Bottom Section */}
                <div className="sidebar-bottom">
                  <div>
                    {token ? (
                      <>
                        <button
                          className="sidebar-bottom-button"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>{" "}
                      </>
                    ) : (
                      <button
                        className="sidebar-bottom-button"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </button>
                    )}
                  </div>
                  <div className="sidebar-social-icons">
                    <Link to="https://www.facebook.com/profile.php?id=61564888602337&mibextid=ZbWKwL">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                    <Link to="https://x.com/_Skin_Saviour?t=-g1zZMRrqeSed8ZPp7-DuQ&s=09">
                      {" "}
                      <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                    <Link to="https://www.instagram.com/_skin_saviour?igsh=MXh1aXI1cmw2cTV5cQ==">
                      {" "}
                      <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Sidebar;
