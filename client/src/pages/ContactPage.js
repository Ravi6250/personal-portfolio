import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import './ContactPage.css';
import './Page.css';

const ContactPage = () => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State to manage submission status (e.g., success, error, submitting)
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser refresh
    setStatus({ ...status, submitting: true, error: null });

    try {
      await submitContactForm(formData);
      setStatus({ submitted: true, submitting: false, error: null });
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        ...status,
        submitting: false,
        error: 'Failed to send message. Please try again.',
      });
    }
  };

  if (status.submitted) {
    return (
      <div className="page-container contact-page">
        <div className="thank-you-message">
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully. I will get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container contact-page">
      <h1 className="page-title">Contact Me</h1>
      <div className="contact-form-container">
        <p className="contact-intro">
          Have a question or want to work together? Leave a message below.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {status.error && <p className="error-message">{status.error}</p>}
          
          <button type="submit" className="submit-button" disabled={status.submitting}>
            {status.submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;