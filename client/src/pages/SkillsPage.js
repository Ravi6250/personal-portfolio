import React, { useState, useEffect } from 'react';
import { getSkills } from '../services/api'; // Import our new API function
import './SkillsPage.css';
import './Page.css';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
      } catch (err) {
        setError('Failed to load skills. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return <div className="page-container"><h2>Loading Skills...</h2></div>;
  }

  if (error) {
    return <div className="page-container"><h2>{error}</h2></div>;
  }

  return (
    <div className="page-container skills-page">
      <h1 className="page-title">Technical Skills</h1>
      <div className="skills-grid">
        {Object.entries(groupedSkills).map(([category, skillsList]) => (
          <div key={category} className="skill-category-card">
            <h2 className="category-title">{category}</h2>
            <div className="skills-list-items">
              {skillsList.map((skill) => (
                <div key={skill._id} className="skill-item">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;