import React from 'react';
import '../../styles/components/HowItWorks.css'; // Fixed path

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Patient Registration',
      description: 'Add new patients or access existing records with our intuitive interface.'
    },
    {
      number: '2',
      title: 'Medical Need Assessment',
      description: 'Document patient symptoms and required medical specialty.'
    },
    {
      number: '3',
      title: 'Doctor Matching',
      description: 'System automatically suggests available doctors with matching specialties.'
    },
    {
      number: '4',
      title: 'Schedule Appointment',
      description: 'Book the appointment and send confirmation to both patient and doctor.'
    }
  ];

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-title">
          <h2>How HealthSync Works</h2>
          <p>Simple, efficient workflow designed specifically for hospital staff</p>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Step = ({ number, title, description }) => {
  return (
    <div className="step">
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default HowItWorks;