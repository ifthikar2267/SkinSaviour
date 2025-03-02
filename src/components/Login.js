import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import Mailcheck from "mailcheck"; 

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
    setEmailWarning("");

    Mailcheck.run({
      email: userEmail,
      domains: ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com"],
      suggested: (suggestion) => {
        setEmailSuggestion(`Did you mean ${suggestion.full}?`);
      },
      empty: () => {
        setEmailSuggestion("");
      },
    });
  };

  // Check email validity when focusing on the password field
  const handlePasswordFocus = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setEmailWarning("Please check your email before entering the password.");
    } else {
      setEmailWarning("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up" && !validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters, include one uppercase letter, one number, and one special character.");
      return;
    }

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message || "Login successful!");
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Form className="w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        <div className="text-center mt-3 mb-3">
          <h3 className="fw-bold">{currentState}</h3>
          <hr className="w-25 mx-auto border-2 border-dark" />
        </div>

        {currentState === "Login" ? null : (
          <Form.Group className="mb-3">
            <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required />
          </Form.Group>
        )}

        {/* Email field with suggestion */}
        <Form.Group className="mb-3">
          <Form.Control onChange={handleEmailChange} value={email} type="email" placeholder="Email" required />
          {emailSuggestion && <small className="text-danger">{emailSuggestion}</small>}
        </Form.Group>

        {/* Password field with check email warning */}
        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value) ? "" : "Weak password. Must contain uppercase, number & special character.");
              }}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onFocus={handlePasswordFocus} // Show warning when focusing on password
              required
            />
            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {passwordError && <small className="text-danger">{passwordError}</small>}
          {emailWarning && <small className="text-danger">{emailWarning}</small>}
        </Form.Group>

        <Row className="mb-3">
          <Col className="text-start">
            <p className="text-muted small" style={{ cursor: "pointer" }}>
              Forgot your password?
            </p>
          </Col>
          <Col className="text-end">
            {currentState === "Login" ? (
              <p className="text-primary small" style={{ cursor: "pointer" }} onClick={() => setCurrentState("Sign Up")}>
                Create account
              </p>
            ) : (
              <p className="text-primary small" style={{ cursor: "pointer" }} onClick={() => setCurrentState("Login")}>
                Login here
              </p>
            )}
          </Col>
        </Row>

        <Button type="submit" className="w-100 mb-5" variant="dark">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
