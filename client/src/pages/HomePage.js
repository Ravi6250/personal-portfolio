import React from 'react';
import { Link } from 'react-router-dom'; // To link to other pages
import './HomePage.css'; // We will create a new CSS file for the home page
import './Page.css'; // Import the general page styles

const HomePage = () => {
  return (
    <div className="page-container home-page">
      <div className="hero-content">
        <h1 className="hero-name">RAVI KUMAR</h1>
        <p className="hero-subtitle">
          Full-Stack Web Developer | MCA Graduate
        </p>
        <p className="hero-description">
          Skilled in building responsive, data-driven applications with React.js and Node.js.
          Keen interest in contributing to innovative projects.
        </p>
        <div className="hero-links">
          {/* These are links from your resume */}
          <a href="https://www.linkedin.com/in/ravi-kumar-505589286/" target="_blank" rel="noopener noreferrer" className="hero-button">
            LinkedIn
          </a>
          <a href="https://github.com/Ravi6250" target="_blank" rel="noopener noreferrer" className="hero-button">
            GitHub
          </a>
          <Link to="/projects" className="hero-button primary">
            View My Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;