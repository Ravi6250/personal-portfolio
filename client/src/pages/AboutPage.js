import React, { useState, useEffect } from 'react';
import { getAboutContent } from '../services/api';
import './AboutPage.css'; // The existing CSS file will be updated
import './Page.css'; // Import the general page styles

const AboutPage = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // These are the "Additional Skills" from your resume
  const additionalSkills = [
    "Problem Solving",
    "Communication",
    "Time Management",
    "Team Collaboration"
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getAboutContent();
        setContent(data.content);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return <div className="page-container"><h2>Loading...</h2></div>;
  }

  if (error) {
    return <div className="page-container"><h2>{error}</h2></div>;
  }

  return (
    <div className="page-container about-page">
      <h1 className="page-title">About Me</h1>
      <div className="about-container">
        <div className="about-text">
          {/* This content is loaded from your database */}
          <p>{content}</p>
        </div>
        <div className="additional-skills">
          <h2>Additional Skills</h2>
          <div className="skills-list">
            {additionalSkills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;