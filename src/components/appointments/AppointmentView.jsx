import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../../data/mockData';

const AppointmentView = ({ appointmentId, onClose }) => {
  const navigate = useNavigate();
  const appointment = appointmentService.getAppointmentById(appointmentId);
  
  if (!appointment) {
    return (
      <div className="patient-view-modal">
        <div className="modal-content">
          <h2>Appointment Not Found</h2>
          <p>The requested appointment does not exist.</p>
          <button onClick={onClose} className="btn btn-primary">Close</button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/admin/appointments/${appointment.id}/edit`);
    if (onClose) onClose();
  };

  const handleCancel = () => {
    if (window.confirm(`Are you sure you want to cancel this appointment?`)) {
      appointmentService.deleteAppointment(appointment.id);
      if (onClose) onClose();
      window.location.reload();
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'green';
      case 'pending': return 'orange';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="patient-view-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Appointment Details</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <div className="patient-profile">
          {/* Appointment Header */}
          <div className="profile-header">
            <div className="patient-avatar">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="patient-info">
              <h3>{appointment.title}</h3>
              <p className="patient-id">Appointment ID: APPT-{String(appointment.id).padStart(3, '0')}</p>
              <span className="status-badge" style={{ 
                background: getStatusColor(appointment.status) === 'green' ? '#e8f5e9' : 
                           getStatusColor(appointment.status) === 'orange' ? '#fff3e0' : '#ffebee',
                color: getStatusColor(appointment.status) === 'green' ? '#2e7d32' : 
                      getStatusColor(appointment.status) === 'orange' ? '#ef6c00' : '#c62828'
              }}>
                {appointment.status}
              </span>
            </div>
            <div className="profile-actions">
              <button onClick={handleEdit} className="btn-action edit">
                Edit
              </button>
              <button onClick={handleCancel} className="btn-action delete">
                Cancel
              </button>
            </div>
          </div>

          {/* Appointment Details Grid */}
          <div className="details-grid">
            <div className="detail-section">
              <h4>Time & Location</h4>
              <div className="detail-row">
                <span className="detail-label">Date & Time:</span>
                <span className="detail-value">{formatDateTime(appointment.start)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">
                  {Math.round((new Date(appointment.end) - new Date(appointment.start)) / (1000 * 60))} minutes
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Room:</span>
                <span className="detail-value">{appointment.room}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Patient Information</h4>
              <div className="detail-row">
                <span className="detail-label">Patient:</span>
                <span className="detail-value">{appointment.patientName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Appointment Type:</span>
                <span className="detail-value">{appointment.type}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Doctor Information</h4>
              <div className="detail-row">
                <span className="detail-label">Doctor:</span>
                <span className="detail-value">{appointment.doctorName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Specialization:</span>
                <span className="detail-value">
                  {appointment.doctorId === 1 ? 'Cardiology' : 
                   appointment.doctorId === 2 ? 'Dermatology' :
                   appointment.doctorId === 3 ? 'Orthopedics' :
                   appointment.doctorId === 4 ? 'Pediatrics' : 'Neurology'}
                </span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Appointment Details</h4>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{appointment.status}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Created On:</span>
                <span className="detail-value">{formatDateTime(appointment.start)}</span>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="notes-section">
            <h4>Appointment Notes</h4>
            <div className="notes-content">
              {appointment.notes || 'No additional notes available.'}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="btn btn-primary">
              <i className="fas fa-print"></i> Print Details
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-envelope"></i> Send Reminder
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-redo"></i> Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentView;