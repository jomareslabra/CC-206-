import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin/Dashboard.css'; // Fixed path

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'New Appointment',
      icon: 'fas fa-calendar-plus',
      description: 'Schedule a new patient appointment',
      action: () => navigate('/admin/appointments'),
      color: '#1a73e8'
    },
    {
      title: 'New Patient',
      icon: 'fas fa-user-plus',
      description: 'Add a new patient to the system',
      action: () => navigate('/admin/patients'),
      color: '#34a853'
    },
    {
      title: 'New Doctor',
      icon: 'fas fa-user-md',
      description: 'Register a new doctor',
      action: () => navigate('/admin/doctors'),
      color: '#fbbc05'
    }
  ];

  return (
    <div className="quick-actions-card">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className="action-card"
            onClick={action.action}
            style={{ '--action-color': action.color }}
          >
            <div className="action-icon">
              <i className={action.icon}></i>
            </div>
            <div className="action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;