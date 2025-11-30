import React from 'react';
import '../../styles/admin/Dashboard.css'; // Fixed path

const StatsCards = ({ stats }) => {
  const statItems = [
    {
      title: 'Appointments Today',
      value: stats.appointmentsToday,
      icon: 'fas fa-calendar-day',
      color: '#1a73e8'
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: 'fas fa-clock',
      color: '#fbbc05'
    },
    {
      title: 'Active Patients',
      value: stats.activePatients,
      icon: 'fas fa-user-injured',
      color: '#34a853'
    },
    {
      title: 'Doctors Available',
      value: stats.doctorsAvailable,
      icon: 'fas fa-user-md',
      color: '#ea4335'
    }
  ];

  return (
    <div className="stats-grid">
      {statItems.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
            <i className={stat.icon}></i>
          </div>
          <div className="stat-content">
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;