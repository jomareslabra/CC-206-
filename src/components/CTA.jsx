import React from 'react';
import '../styles/components/CTA.css';

const CTA = () => {
  const handleRequestDemo = () => {
    alert('Request Demo clicked! This would open contact form.');
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
          Request a Demo
        </button>
      </div>
    </section>
  );
};

export default CTA;