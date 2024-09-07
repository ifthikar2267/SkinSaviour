import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    comment: '',
  });

  const [errorMessages, setErrorMessages] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = '';

    if (!formData.name) errors += 'Name is required. ';
    if (!formData.email) errors += 'Email is required. ';
    if (!formData.phoneNumber) errors += 'Phone Number is required. ';
    if (!formData.comment) errors += 'Comment is required. ';

    if (errors) {
      setErrorMessages(errors);
    } else {
      setErrorMessages('');
      alert('Your comment is successfully sent.');
      
      // Reset the form fields
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        comment: '',
      });
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form className="contact-container" onSubmit={handleSubmit}>
        <div className="name">
          <input
            id='name'
            type="text"
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            aria-required="true"
          />
        </div>

        <div className="email">
          <input
            id='email'
            type="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
          />
        </div>

        <div className="phno">
          <input
            id='phoneNumber'
            type="number"
            placeholder='Phone Number'
            value={formData.phoneNumber}
            onChange={handleChange}
            aria-required="true"
          />
        </div>

        <div className="comment">
          <input
            id='comment'
            type="text"
            placeholder='Comment'
            value={formData.comment}
            onChange={handleChange}
            aria-required="true"
          />
        </div>

        <div className="button">
          <button type="submit">Send</button>
        </div>

        <div id="error-message" aria-live="assertive" style={{ color: 'red' }}>
          {errorMessages}
        </div>
      </form>
    </div>
  );
}

export default Contact;
