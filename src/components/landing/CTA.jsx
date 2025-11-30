import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/CTA.css'; // Fixed path

const CTA = () => {
  const navigate = useNavigate();

  const handleRequestDemo = () => {
    navigate('/login');
  };

  return (
    <section className="cta">
      <div className="container">
        <h2>Ready to Transform Your Hospital's Booking System?</h2>
        <p>
          Join dozens of healthcare facilities already using HealthSync to streamline 
          their operations and improve patient care.
        </p>
        <button className="btn btn-primary" onClick={handleRequestDemo}>
          Get Started Free
        </button>
      </div>
    </section>
  );
};

export default CTA;