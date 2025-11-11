import React, { useState, useEffect } from 'react';
import { getAboutAdmin, updateAbout } from '../../services/adminService';
import './AboutEditor.css';

const AboutEditor = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        const response = await getAboutAdmin();
        if (response.data) {
          setContent(response.data.content);
        }
      } catch (err) {
        setError('Failed to load "About Me" content.');
      } finally {
        setLoading(false);
      }
    };
    loadAboutContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await updateAbout({ content });
      setSuccess('"About Me" content updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update content.');
    }
  };

  if (loading) return <p>Loading editor...</p>;

  return (
    <div className="about-editor">
      <h2>Edit "About Me" Section</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your 'About Me' paragraph here..."
          className="about-textarea"
        />
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default AboutEditor;