import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../../data/mockData';

const DoctorView = ({ doctorId, onClose }) => {
  const navigate = useNavigate();
  const doctor = doctorService.getDoctorById(doctorId);
  
  if (!doctor) {
    return (
      <div className="patient-view-modal">
        <div className="modal-content">
          <h2>Doctor Not Found</h2>
          <p>The requested doctor record does not exist.</p>
          <button onClick={onClose} className="btn btn-primary">Close</button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/admin/doctors/${doctor.id}/edit`);
    if (onClose) onClose();
  };

  const handleDeactivate = () => {
    if (window.confirm(`Are you sure you want to deactivate ${doctor.name}?`)) {
      doctorService.deleteDoctor(doctor.id);
      if (onClose) onClose();
      window.location.reload();
    }
  };

  return (
    <div className="patient-view-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Doctor Profile</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <div className="patient-profile">
          {/* Doctor Header - MATCHES PATIENT VIEW */}
          <div className="profile-header">
            <div className="patient-avatar">
              <i className="fas fa-user-md"></i>
            </div>
            <div className="patient-info">
              <h3>{doctor.name}</h3>
              <p className="patient-id">ID: {doctor.doctorId}</p>
              <span className={`status-badge ${doctor.status}`}>
                {doctor.status}
              </span>
            </div>
            <div className="profile-actions">
              <button onClick={handleEdit} className="btn-action edit">
                Edit
              </button>
              <button onClick={handleDeactivate} className="btn-action delete">
                Deactivate
              </button>
            </div>
          </div>

          {/* Doctor Details Grid - REMOVED ICONS FROM HEADERS */}
          <div className="details-grid">
            <div className="detail-section">
              <h4>Professional Information</h4>
              <div className="detail-row">
                <span className="detail-label">Specialization:</span>
                <span className="detail-value">{doctor.specialization}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">{doctor.yearsOfExperience} years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Hourly Rate:</span>
                <span className="detail-value">${doctor.hourlyRate}/hr</span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Contact Information</h4>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{doctor.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{doctor.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Office:</span>
                <span className="detail-value">{doctor.office}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Schedule</h4>
              <div className="detail-row">
                <span className="detail-label">Working Hours:</span>
                <span className="detail-value">{doctor.schedule}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Availability:</span>
                <span className="detail-value">
                  {doctor.status === 'active' ? 'Available for appointments' : 
                   doctor.status === 'on-leave' ? 'Temporarily unavailable' : 'Not available'}
                </span>
              </div>
            </div>

            <div className="detail-section">
              <h4>Qualifications</h4>
              <div className="detail-row">
                <span className="detail-label">Certifications:</span>
                <span className="detail-value">
                  {doctor.qualifications.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Notes Section - REMOVED ICON */}
          <div className="notes-section">
            <h4>Additional Notes</h4>
            <div className="notes-content">
              {doctor.notes || 'No additional notes available.'}
            </div>
          </div>

          {/* Quick Actions - MATCHES PATIENT VIEW */}
          <div className="quick-actions">
            <button className="btn btn-primary">
              <i className="fas fa-calendar-plus"></i> View Schedule
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-envelope"></i> Send Message
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-chart-line"></i> View Performance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorView;