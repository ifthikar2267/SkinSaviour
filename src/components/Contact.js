import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });

  const [errorMessages, setErrorMessages] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = "";

    if (!formData.name) errors += "Name is required. ";
    if (!formData.email) errors += "Email is required. ";
    if (!formData.phoneNumber) errors += "Phone Number is required. ";
    if (!formData.comment) errors += "Comment is required. ";

    if (errors) {
      setErrorMessages(errors);
    } else {
      setErrorMessages("");

      // Send the form data to the server
      fetch("https://skin-saviour-server.vercel.app/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Your comment is successfully sent.");
            // Reset the form fields
            setFormData({
              name: "",
              email: "",
              phoneNumber: "",
              comment: "",
            });
          } else {
            setErrorMessages("Failed to send message. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMessages("An error occurred. Please try again later.");
        });
    }
  };

  return (
    <>
      <div className="contact-arrow-left" onClick={() => navigate(-1)}>
        <FaArrowCircleLeft />
      </div>
      <div style={{ marginTop: "0px", height:"91.5vh" }}>
        <h1 >Contact Us</h1>
        <form className="contact-container" onSubmit={handleSubmit} id="form">
          <div className="name">
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              aria-required="true"
            />
          </div>

          <div className="email">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              aria-required="true"
            />
          </div>

          <div className="phno">
            <input
              id="phoneNumber"
              type="number"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              aria-required="true"
            />
          </div>

          <div className="comment">
            <input
              id="comment"
              type="text"
              placeholder="Comment"
              value={formData.comment}
              onChange={handleChange}
              aria-required="true"
            />
          </div>

          <div className="button">
            <button type="submit">Send</button>
          </div>

          <div
            id="error-message"
            aria-live="assertive"
            style={{ background: "white", color: "red" ,borderRadius:"10px", marginTop:"20px", padding:"0px 10px"}}
          >
            {errorMessages}
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
