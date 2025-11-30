import React from 'react';
import '../../styles/admin/Dashboard.css'; // Fixed path

const Schedule = ({ appointments }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#34a853';
      case 'pending':
        return '#fbbc05';
      case 'cancelled':
        return '#ea4335';
      default:
        return '#5f6368';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="schedule-card">
      <div className="schedule-header">
        <h3>Today's Schedule</h3>
        <span className="schedule-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
      </div>
      
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-item">
            <div className="appointment-time">{appointment.time}</div>
            <div className="appointment-details">
              <div className="appointment-main">
                <strong>{appointment.patientName}</strong>
                <span>with {appointment.doctorName}</span>
              </div>
              <div className="appointment-meta">
                <span className="specialization">{appointment.specialization}</span>
                <span 
                  className="status-badge"
                  style={{ 
                    backgroundColor: `${getStatusColor(appointment.status)}20`,
                    color: getStatusColor(appointment.status)
                  }}
                >
                  {getStatusText(appointment.status)}
                </span>
              </div>
            </div>
            <div className="appointment-actions">
              {appointment.status === 'confirmed' && (
                <button className="action-btn primary">Check In</button>
              )}
              <button className="action-btn secondary">Reschedule</button>
              <button className="action-btn danger">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;