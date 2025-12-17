import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentsCalendar } from '../components/appointments';

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState('calendar'); // 'calendar' or 'list'

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Appointments</h1>
        <p>Schedule and manage patient appointments</p>
      </div>
      
      <div className="patients-page">
        <div className="table-header">
          <h2>Appointments Calendar</h2>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/admin/appointments/new')}
          >
            + New Appointment
          </button>
        </div>

        <div className="view-toggle">
          <button 
            className={`btn ${viewType === 'calendar' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setViewType('calendar')}
          >
            <i className="fas fa-calendar-alt"></i> Calendar View
          </button>
          <button 
            className={`btn ${viewType === 'list' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setViewType('list')}
            disabled
          >
            <i className="fas fa-list"></i> List View (Coming Soon)
          </button>
        </div>

        <div className="calendar-wrapper">
          <AppointmentsCalendar />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;