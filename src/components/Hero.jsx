import React from 'react';
import '../styles/components/Hero.css';

const Hero = () => {
  const handleGetStarted = () => {
    alert('Get Started clicked! Redirecting to registration.');
  };

  const handleWatchDemo = () => {
    alert('Watch Demo clicked! Opening video demo.');
  };

  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Streamlined Hospital Booking & Patient Management</h1>
          <p>
            HealthSync is an all-in-one solution for hospital staff to efficiently manage 
            patient appointments, medical records, and doctor schedules in one centralized platform.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={handleWatchDemo}>
              Watch Demo
            </button>
          </div>
        </div>
        <div className="hero-image">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  return (
    <div className="dashboard-preview">
      <div className="dashboard-header">
        <div className="dashboard-dot red"></div>
        <div className="dashboard-dot yellow"></div>
        <div className="dashboard-dot green"></div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-row">
          <DashboardCard title="Today's Appointments" value="24" />
          <DashboardCard title="Available Doctors" value="12" />
        </div>
        <div className="dashboard-row">
          <DashboardCard title="Pending Records" value="7" />
          <DashboardCard title="Completed Today" value="18" />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Hero;