import React from 'react';
import '../../styles/components/Features.css'; // Fixed path

const Features = () => {
  const features = [
    {
      icon: 'fas fa-calendar-check',
      title: 'Smart Appointment Booking',
      description: 'Automatically match patients with appropriate doctors based on medical specialty and availability.'
    },
    {
      icon: 'fas fa-user-md',
      title: 'Doctor Management',
      description: 'Manage doctor profiles, specialties, schedules, and availability all in one place.'
    },
    {
      icon: 'fas fa-file-medical',
      title: 'Patient Records',
      description: 'Securely store and access patient medical histories, treatment plans, and appointment history.'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Analytics & Reporting',
      description: 'Gain insights into appointment trends, doctor utilization, and patient flow with detailed reports.'
    },
    {
      icon: 'fas fa-bell',
      title: 'Automated Reminders',
      description: 'Reduce no-shows with automated appointment reminders sent via SMS or email.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure & Compliant',
      description: 'HIPAA-compliant platform ensuring patient data security and privacy at all times.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-title">
          <h2>Powerful Features for Hospital Staff</h2>
          <p>Designed specifically for healthcare professionals to streamline operations and improve patient care</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Features;