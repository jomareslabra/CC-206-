import React from 'react';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../../data/mockData';

const PatientView = ({ patientId, onClose }) => {
  const navigate = useNavigate();
  const patient = patientService.getPatientById(patientId);
  
  if (!patient) {
    return (
      <div className="patient-view-modal">
        <div className="modal-content">
          <h2>Patient Not Found</h2>
          <p>The requested patient record does not exist.</p>
          <button onClick={onClose} className="btn btn-primary">Close</button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/admin/patients/${patient.id}/edit`);
    if (onClose) onClose();
  };

  const handleArchive = () => {
    if (window.confirm(`Are you sure you want to archive ${patient.fullName}?`)) {
      patientService.deletePatient(patient.id);
      if (onClose) onClose();
      // In a real app, you'd refresh the patient list here
      window.location.reload();
    }
  };

  return (
    <div className="patient-view-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Patient Profile</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <div className="patient-profile">
          {/* Patient Header */}
          <div className="profile-header">
            <div className="patient-avatar">
              <i className="fas fa-user-injured"></i>
            </div>
            <div className="patient-info">
              <h3>{patient.fullName}</h3>
              <p className="patient-id">ID: {patient.patientId}</p>
              <span className={`status-badge ${patient.status}`}>
                {patient.status}
              </span>
            </div>
            <div className="profile-actions">
              <button onClick={handleEdit} className="btn-action edit">
                <i className="fas fa-edit"></i> Edit
              </button>
              <button onClick={handleArchive} className="btn-action delete">
                <i className="fas fa-archive"></i> Archive
              </button>
            </div>
          </div>

          {/* Patient Details Grid */}
          <div className="details-grid">
            <div className="detail-section">
              <h4><i className="fas fa-info-circle"></i> Personal Information</h4>
              <div className="detail-row">
                <span className="detail-label">Date of Birth:</span>
                <span className="detail-value">{patient.dateOfBirth}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Age:</span>
                <span className="detail-value">
                  {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Blood Type:</span>
                <span className="detail-value">{patient.bloodType}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4><i className="fas fa-phone"></i> Contact Information</h4>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{patient.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{patient.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{patient.address}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4><i className="fas fa-heartbeat"></i> Medical Information</h4>
              <div className="detail-row">
                <span className="detail-label">Primary Concern:</span>
                <span className="detail-value">{patient.primaryConcern}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Allergies:</span>
                <span className="detail-value">
                  {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Appointment:</span>
                <span className="detail-value">{patient.lastAppointment}</span>
              </div>
            </div>

            <div className="detail-section">
              <h4><i className="fas fa-shield-alt"></i> Insurance & Emergency</h4>
              <div className="detail-row">
                <span className="detail-label">Insurance Provider:</span>
                <span className="detail-value">{patient.insuranceProvider}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Insurance ID:</span>
                <span className="detail-value">{patient.insuranceId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Emergency Contact:</span>
                <span className="detail-value">
                  {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Emergency Phone:</span>
                <span className="detail-value">{patient.emergencyContact.phone}</span>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="notes-section">
            <h4><i className="fas fa-clipboard"></i> Medical Notes</h4>
            <div className="notes-content">
              {patient.notes || 'No additional notes available.'}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="btn btn-primary">
              <i className="fas fa-calendar-plus"></i> Schedule Appointment
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-file-medical"></i> Add Medical Record
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-history"></i> View Appointment History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientView;