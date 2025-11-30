import React from 'react';
import StatsCards from './StatsCards';
import Schedule from './Schedule';
import QuickActions from './QuickActions';
import { mockStats, mockAppointments, mockRecentActivities } from '../../data/mockData';
import '../../styles/admin/Dashboard.css'; // Fixed path

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Key Metrics */}
      <StatsCards stats={mockStats} />

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-main">
          <Schedule appointments={mockAppointments} />
        </div>

        {/* Right Column */}
        <div className="dashboard-sidebar">
          <QuickActions />
          
          {/* Recent Activity */}
          <div className="activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {mockRecentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-dot"></div>
                  <p>{activity}</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;