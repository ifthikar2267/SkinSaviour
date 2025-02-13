import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Badge, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft,faBagShopping,faBars,faSearch,faUserAlt,} from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { getTotalCartCount, backendUrl } = useContext(ShopContext);
  const cartCount = getTotalCartCount();
  const [visible, setVisible] = useState(false);
  const { setShowSearch, token, setToken, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
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

  return (
    <Navbar expand="sm" className="py-3 px-4 bg-white">
      <Navbar.Brand as={Link} to="/">
        <img
          alt="Logo"
          src="/assets/images/LogoNav.jpg"
          className="rounded-circle"
          width="50"
          height="50"
        />
      </Navbar.Brand>

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
            <NavLink to="/category" className="nav-link">
              CATEGORY
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
          icon={faSearch}
          className="fs-5 cursor-pointer"
        />

        {/* Cart Icon with Badge */}
        <div className="position-relative">
          <NavLink to="/cart" className="text-dark">
            <FontAwesomeIcon
              icon={faBagShopping}
              className="fs-5 cursor-pointer"
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

        {/* User Profile Dropdown */}
        <NavDropdown
          title={
            <FontAwesomeIcon icon={faUserAlt} className="fs-5 cursor-pointer" />
          }
          id="user-dropdown"
          align="end"
        >
          {token ? (
            <>
              <NavDropdown.Item as={Link} to="/profile">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orders">
                Orders
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>{" "}
            </>
          ) : (
            <NavDropdown.Item as={Link} to="/login">
              Login
            </NavDropdown.Item>
          )}
        </NavDropdown>
        {/* Hamburger Icon for Mobile */}
        <FontAwesomeIcon
          icon={faBars}
          className="fs-2 cursor-pointer d-block d-sm-none ms-auto"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`position-absolute top-0 end-0 bottom-0 bg-white transition-all ${
          visible ? "w-100" : "w-0"
        }`}
        style={{ zIndex: visible ? "9999" : "0" }}
      >
        {visible && (
          <div className="d-flex flex-column text-dark">
            <div
              onClick={() => setVisible(false)}
              className="d-flex align-items-center gap-3 p-3"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="h-2" />
            </div>

            <NavLink
              className={({ isActive }) =>
                `py-2 pl-6 border ${
                  isActive ? "bg-white text-dark fw-bold" : "bg-white text-dark"
                } text-decoration-none`
              }
              style={({ isActive }) => ({
                color: isActive ? "black" : "inherit",
                backgroundColor: isActive ? "white" : "inherit",
              })}
              to="/"
              onClick={() => setVisible(false)}
            >
              HOME
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `py-2 pl-6 border ${
                  isActive ? "bg-white text-dark fw-bold" : "bg-white text-dark"
                } text-decoration-none`
              }
              style={({ isActive }) => ({
                color: isActive ? "black" : "inherit",
                backgroundColor: isActive ? "white" : "inherit",
              })}
              to="/product"
              onClick={() => setVisible(false)}
            >
              PRODUCT
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `py-2 pl-6 border ${
                  isActive ? "bg-white text-dark fw-bold" : "bg-white text-dark"
                } text-decoration-none`
              }
              style={({ isActive }) => ({
                color: isActive ? "black" : "inherit",
                backgroundColor: isActive ? "white" : "inherit",
              })}
              to="/category"
              onClick={() => setVisible(false)}
            >
              CATEGORY
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `py-2 pl-6 border ${
                  isActive ? "bg-white text-dark fw-bold" : "bg-white text-dark"
                } text-decoration-none`
              }
              style={({ isActive }) => ({
                color: isActive ? "black" : "inherit",
                backgroundColor: isActive ? "white" : "inherit",
              })}
              to="/about"
              onClick={() => setVisible(false)}
            >
              ABOUT
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `py-2 pl-6 border ${
                  isActive ? "bg-white text-dark fw-bold" : "bg-white text-dark"
                } text-decoration-none`
              }
              style={({ isActive }) => ({
                color: isActive ? "black" : "inherit",
                backgroundColor: isActive ? "white" : "inherit",
              })}
              to="/contact"
              onClick={() => setVisible(false)}
            >
              CONTACT
            </NavLink>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default Sidebar;
