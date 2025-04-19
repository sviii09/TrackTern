// About.tsx
import React from 'react';
import './About.css'; // Optional: Create this file for styling

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <div className="about-block">
        <h2 className="about-subtitle">Our Team</h2>
        <p className="about-text">
          This project, Tracktern, was developed in 2025 by the following dedicated web developer members:
        </p>
        <ul className="about-list">
          <li>Charishma</li>
          <li>Manasvi</li>
          <li>Charitha</li>
          <li>Sushmitha</li>
        </ul>
        <h2 className="about-subtitle">Reason Behind Development</h2>
        <p className="about-text">
          Tracktern was created to empower students and young professionals by providing a centralized platform to discover, apply, and learn from internship opportunities. Our goal is to bridge the gap between education and industry, offering valuable resources and community support to help users kickstart their careers. This project reflects our commitment to fostering skill development and career growth in an increasingly competitive job market.
        </p>
      </div>
    </div>
  );
};

export default About;