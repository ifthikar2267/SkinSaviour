import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const {token , setToken , backendUrl} = useContext(ShopContext)
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    try {
      if(currentState === 'Sign Up') {

        const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
        if(response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
        
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', {email,password})
        if(response.data.success) {
          setToken(response.data.token)
          toast.success(response.data.message || "Login successful!");;
          localStorage.setItem('token',response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
        
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  };


  useEffect(() => {
    if(token) {
      navigate('/')
    }
  },[token, navigate])

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Form className="w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        {/* Title */}
        <div className="text-center mt-3 mb-3">
          <h3 className="fw-bold">{currentState}</h3>
          <hr className="w-25 mx-auto border-2 border-dark" />
        </div>

        {/* Name field (only in Sign Up mode) */}
        {currentState === "Login" ? null : (
          <Form.Group className="mb-3">
            <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required />
          </Form.Group>
        )}

        {/* Email field */}
        <Form.Group className="mb-3">
          <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required />
        </Form.Group>

        {/* Password field */}
        <Form.Group className="mb-3">
          <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
        </Form.Group>

        {/* Forgot Password & Toggle Login/Signup */}
        <Row className="mb-3">
          <Col className="text-start">
            <p className="text-muted small" style={{ cursor: "pointer" }}>
              Forgot your password?
            </p>
          </Col>
          <Col className="text-end">
            {currentState === "Login" ? (
              <p
                className="text-primary small"
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentState("Sign Up")}
              >
                Create account
              </p>
            ) : (
              <p
                className="text-primary small"
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentState("Login")}
              >
                Login here
              </p>
            )}
          </Col>
        </Row>

        {/* Submit Button */}
        <Button type="submit" className="w-100 mb-5" variant="dark">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
